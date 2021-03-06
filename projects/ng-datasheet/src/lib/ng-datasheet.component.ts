import { DefaultTranslation } from './models/default-translation';
import { ItemEvent } from './models/item-event';
import { DateParserFormatter } from './cell-edit-date/date-parser-formatter';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Sort } from './models/sort';
import { Column } from './models/column';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  EventEmitter,
  Output,
  ElementRef,
  HostListener
} from '@angular/core';
import { Pagination } from './models/pagination';
import { Filter } from './models/filter';
import { RenderEvent } from './models/render-event';
import { ParameterButton } from './models/parameter-button';
import { NavigatingService } from './services/navigating.service';
import { RenderingService } from './services/rendering.service';
import { ResizingService } from './services/resizing.service';
import { DataService } from './services/data.service';
import { Coordinate } from './models/coordinate';
import { Observable } from 'rxjs';
import { RowEvent } from './models/row-event';
import { SelectionEvent } from './models/selection-event';
import { CellEvent } from './models/cell-event';
import { ContextMenuComponent } from './context-menu/context-menu.component';

let COL_FORMAT = '';

export function dateParseFactory() {
  const dpf = new DateParserFormatter();
  dpf.formatDate = COL_FORMAT;
  return dpf;
}

// @dynamic
@Component({
  selector: 'ds-datasheet',
  templateUrl: 'ng-datasheet.component.html',
  styleUrls: ['ng-datasheet.component.css'],
  providers: [
    {
      provide: NgbDateParserFormatter,
      useFactory: dateParseFactory
    }
  ]
})
export class NgDatasheetComponent implements OnInit {
  get columns(): Array<Column> {
    return this._columns;
  }

  get dataSet(): Array<Object> {
    return this._dataSet;
  }

  @Input('dataSet') set dataSet(val: Array<Object>) {
    this._dataSet = val;

    if (this.withPagination && this.static) {
      if (this.pagination) {
        this.pagination.total = this.dataSet.length;
        this.pagination.currentPage = 0;
      } else {
        this.pagination = new Pagination(this.dataSet.length, 15, 0);
      }
    }

    this.initTouched();

    this.filterList = this.dataService.filterDataSet(
      this.dataSet,
      this.filterList,
      this.filters,
      this.withPagination,
      this.static,
      this.pagination
    );
  }

  @Input('columns') set columns(val: Array<Column>) {
    this._columns = val;
    if (this._columns && this.tbl.nativeElement) {
      this.filters = this.navigatingService.initFilters(this._columns);

      this.renderingService.setNoWidthColumn(
        this.columns,
        this.tbl.nativeElement,
        this.dsKey
      );
    }
    this.initTouched();
  }

  @Input() public parameterButtons: Array<ParameterButton>;
  @Input()
  public defaultTranslation: DefaultTranslation = new DefaultTranslation();
  @Input() public newModelFunction: Function;
  @Input() public onDeleteRowFunction: Function;
  @Input() public dateFormat = 'MM-DD-YYYY';
  @Input() public filters: Array<Filter>;
  @Input() public pagination: Pagination;
  @Input() public sort: Sort;
  @Input() public dsKey: string;
  @Input() public trBgColor: string;
  @Input() public trBgColorFunction: Function;

  @Input() public withAdd = true;
  @Input() public withAddButton = true;
  @Input() public withDeleteButton = true;
  @Input() public static = true;
  @Input() public withPagination = false;
  @Input() public editable = true;
  @Input() public searchable = true;
  @Input() public globalMenu = false;
  @Input() public usePointerOnLine = false;

  @Output() public renderEvent: EventEmitter<RenderEvent> = new EventEmitter<
    RenderEvent
  >();
  @Output() public rowEvent: EventEmitter<RowEvent> = new EventEmitter<
    RowEvent
  >();
  @Output() public selectionEvent: EventEmitter<
    SelectionEvent
  > = new EventEmitter<SelectionEvent>();
  @Output() public rowDeleteEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() public rowAddEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() public selectCellEvent: EventEmitter<CellEvent> = new EventEmitter<
    CellEvent
  >();

  @ViewChild('selectBox', { read: ElementRef }) selectBox: ElementRef;
  @ViewChild('tbl', { read: ElementRef }) tbl: ElementRef;
  @ViewChild('contextMenu', { read: ContextMenuComponent })
  contextMenu: ContextMenuComponent;

  public selection: Object = {};
  public newModel: Object;
  public printNew = true;
  public filterList: Array<number> = new Array<number>();
  public main: Coordinate = new Coordinate();
  public edited: Coordinate = new Coordinate();
  public start: Coordinate = new Coordinate();
  public end: Coordinate = new Coordinate();
  public selected: Boolean = false;
  public colOnTab: number;
  public globalSelected = false;
  public globalIndeterminate = false;
  public touched: Array<Array<boolean>>;

  private _dataSet: Array<Object>;
  private _columns: Array<Column>;
  private _actualRow: number;

  constructor(
    public navigatingService: NavigatingService,
    public renderingService: RenderingService,
    public resizingService: ResizingService,
    public dataService: DataService,
    private eRef: ElementRef
  ) { }

  @HostListener('document:click', ['$event']) clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.end.empty();
      this.start.empty();
      this.edited.empty();
      this.main.empty();
    }
  }

  initTouched() {
    if (this.dataSet && this.columns) {
      this.touched = new Array();

      this.columns.forEach((column, i) => {
        if (column.columnValidators) {
          this.touched[i] = new Array();

          this.dataSet.forEach((data, j) => {
            this.touched[i][j] = false;
          });
        }
      });
    }
  }

  addTouchedNew(index: number, touch: boolean = this.withAdd) {
    this.columns.forEach((column, i) => {
      if (column.columnValidators) {
        this.touched[i][index] = touch;
      }
    });
  }

  ngOnInit() {
    if (this.columns) {
      // datePicker trick for ng-bootstrap date parsing
      COL_FORMAT = this.dateFormat;

      if (!this.filters) {
        this.filters = this.navigatingService.initFilters(this.columns);
      }

      if (!this.sort) {
        this.sort = new Sort();
      }

      if (this.withPagination && this.static && this.dataSet) {
        if (this.pagination) {
          this.pagination.total = this.dataSet.length;
          this.pagination.currentPage = 0;
        } else {
          this.pagination = new Pagination(this.dataSet.length, 15, 0);
        }
      }

      this.filterList = this.dataService.filterDataSet(
        this.dataSet,
        this.filterList,
        this.filters,
        this.withPagination,
        this.static,
        this.pagination
      );

      if (this.columns) {
        this.renderingService.setNoWidthColumn(
          this.columns,
          this.tbl.nativeElement,
          this.dsKey
        );
      }
    }

    if (this.newModelFunction) {
      this.newModel = this.newModelFunction();
    }
  }

  onglobalSelectEvent(selected: object) {
    this.selection = {};
    this.globalSelected = true;

    for (const property in selected) {
      this._dataSet.forEach((obj, index) => {
        if(property === index.toString()) {
          this.selection[index] = obj;
        }
      });
    }

    this.globalIndeterminate = (Object.keys(this.selection).length === 0 || Object.keys(this.selection).length === this._dataSet.length) ? false : true;
    
    this.selectionEvent.emit(new SelectionEvent(this.selection));
  }

  onGlobalSelectAll(event?: Event) {
    this.selection = {};
    
    if (this.globalSelected) {
      this.filterList.forEach((fObj, fIndex) => {
        this._dataSet.forEach((obj, index) => {
          if(fObj === index) {
            this.selection[index] = obj;
          }
        });
      });
    }

    this.globalSelected = (Object.keys(this.selection).length === this._dataSet.length) ? true : false;
    this.globalIndeterminate = (Object.keys(this.selection).length === 0 || Object.keys(this.selection).length === this._dataSet.length) ? false : true;

    this.selectionEvent.emit(new SelectionEvent(this.selection));
  }

  onCheckSelection(event: Event, row: number, obj: object) {
    if (this.selection[row]) {
      this.selection[row] = obj;
    } else {
      delete this.selection[row];
    }

    this.globalIndeterminate = (Object.keys(this.selection).length > 0) ? true : false;

    this.selectionEvent.emit(new SelectionEvent(this.selection));
  }

  onTableBlur(event: Event) { }

  onMouseDown(event: MouseEvent, obj: Object, row: number, col: number) {
    if (this.editable) {
      if (this.columns[col].selectable) {
        if (row !== -1 || (row === -1 && this.withAdd)) {
          this.main.setCoord(row, col);
        }

        this.colOnTab = col;
        this.end.empty();

        if (this.edited.row !== row || this.edited.col !== col) {
          if (
            !this.edited.isEmpty() &&
            this.columns[this.edited.col] &&
            this.columns[this.edited.col].columnValidators
          ) {
            this.touched[this.edited.col][this.edited.row] = true;
          }

          this.edited.empty();
        }

        if (row !== -1 && this.edited.isEmpty()) {
          this.selected = false;
          this.start.setCoord(row, col);
        }
      }
      this.selectBox.nativeElement.focus({ preventScroll: true });
    }
  }

  onBlur(event: FocusEvent, newRow: boolean = false): void {
    if (this.selectBox.nativeElement !== event.relatedTarget) {
      if (
        !this.edited.isEmpty() &&
        this.columns[this.edited.col] &&
        this.columns[this.edited.col].columnValidators
      ) {
        this.touched[this.edited.col][this.edited.row] = true;
      }
      this.end.empty();
      this.start.empty();
      this.edited.empty();
      this.main.empty();
    }
  }

  deleteRow(obj: object) {
    if (
      !this.onDeleteRowFunction ||
      (this.onDeleteRowFunction && this.onDeleteRowFunction(obj))
    ) {
      this.dataSet.forEach((item, index) => {
        if (item === obj) {
          this.dataSet.splice(index, 1);
        }
      });
      this.rowDeleteEvent.emit(obj);
    }
  }

  addNewModel() {
    this.addTouchedNew(this.dataSet.length);
    this.dataSet.push(this.newModel);

    this.rowAddEvent.emit(this.newModel);

    this.printNew = false;
    delete this.newModel;
    this.newModel = this.newModelFunction();

    this.dataService.filterDataSet(
      this.dataSet,
      this.filterList,
      this.filters,
      this.withPagination,
      this.static,
      this.pagination
    );

    setTimeout(() => {
      this.printNew = true;
    }, 10);
  }

  resetNewModel() {
    if (this.newModelFunction) {
      this.newModel = this.newModelFunction();
    }
  }

  getBgColor(row: number = null, column?: Column): string {
    if (column) {
      if (this._actualRow === row) {
        if (this.trBgColor) {
          return this.trBgColor;
        } else if (this.trBgColorFunction && column) {
          return this.trBgColorFunction(this._actualRow, row, column);
        }
      } else if (column.backgroundColor) {
        return column.backgroundColor;
      }
    }

    return '';
  }

  changeTRStyle(row: number = null): void {
    this._actualRow = row;
  }

  onMouseOver(event: MouseEvent, obj: Object, row: number, col: number) {
    if (this.editable && !this.selected) {
      this.end.setCoord(row, col);
    }
  }

  onMouseUp(event: MouseEvent, obj: Object, row: number, col: number) {
    if (this.editable) {
      if (!this.selected) {
        if (row !== -1) {
          this.end.setCoord(row, col);
        } else {
          this.end.setCoord(this.dataSet.length - 1, col);
        }
      }

      if ((this.start.row === row && this.start.col === col) || row === -1) {
        this.start.empty();
        this.end.empty();

        if (
          this.columns[col].autoOpen &&
          this.columns[col].isEditable(row) &&
          (row !== -1 || (row === -1 && this.withAdd))
        ) {
          this.edited.setCoord(row, col);
        }
      }

      this.selected = true;

      if (this.edited.isEmpty()) {
        this.selectBox.nativeElement.focus({ preventScroll: true });
      }
      this.rowEvent.emit(new RowEvent(obj, row));
    } else {
      this.rowEvent.emit(new RowEvent(obj, row));
    }
    this.selectCellEvent.emit(
      new CellEvent(this.main, this.start, this.end, this.edited)
    );
  }

  onDblClick(event: MouseEvent, row: number, col: number): void {
    if (
      this.editable &&
      this.columns[col].isEditable(row) &&
      (row !== -1 || (row === -1 && this.withAdd))
    ) {
      this.edited.setCoord(row, col);
    }
  }
  onRightClick(event: MouseEvent): void {
    /* const pos = event.currentTarget['getBoundingClientRect']();

    this.contextMenu.openContext(event.pageX - pos.x, event.pageY - pos.y);
    event.preventDefault();*/
  }

  onCopy(event: ClipboardEvent) {
    this.copyData(event);
  }

  onCut(event: ClipboardEvent) {
    this.copyData(event, true);
  }

  onPaste(event: ClipboardEvent) {
    if (!this.main.isEmpty() && this.edited.isEmpty()) {
      let text: string = event.clipboardData.getData('text/plain');
      text = text.trim();

      let row: number = this.main.row;
      let col: number = this.main.col;

      let lineSeparator = '\r\n';

      if (text.indexOf(lineSeparator) === -1) {
        lineSeparator = '\n';
      }

      if (this.main.row !== -1 || text.split(lineSeparator).length === 1) {
        this.start.setCoord(this.main.row, this.main.col);
      } else {
        this.start.setCoord(this.dataSet.length, this.main.col);
        this.main.setCoord(this.dataSet.length, this.main.col);
      }

      text.split(lineSeparator).forEach(rowPaste => {
        col = this.main.col;

        if (this.newModelFunction) {
          if (
            (row === -1 || row === this.dataSet.length) &&
            text.split(lineSeparator).length > 1
          ) {
            this.addTouchedNew(this.dataSet.length, false);
            this.dataSet.push(this.newModelFunction());
          }
        }

        rowPaste.split('\t').forEach(colPaste => {
          if (this.columns[col] && this.columns[col].isEditable(row)) {
            const data: any = this.dataService.pasteType(
              colPaste,
              this.columns[col]
            );
            const columnItem: Column = this.columns[col];
            const rowItem: number = row === -1 ? this.dataSet.length - 1 : row;

            if (data instanceof Observable) {
              data.subscribe(
                function (
                  rowItemPasted: number,
                  columnItemPasted: Column,
                  dataItem: Array<any>
                ) {
                  let newData: Object = null;
                  if (dataItem && dataItem.length !== 0) {
                    newData = dataItem[0];
                  }
                  columnItemPasted.setColumnData(
                    this.dataSet[rowItemPasted],
                    newData
                  );

                  const ie = new ItemEvent();
                  ie.column = columnItemPasted;
                  ie.data = this.dataSet[rowItemPasted];
                  ie.item = newData;
                  ie.row = rowItemPasted;
                  columnItemPasted.itemEvent.emit(ie);
                }.bind(this, rowItem, columnItem)
              );
            } else {
              const ie = new ItemEvent();

              if (row === -1) {
                if (text.split(lineSeparator).length > 1) {
                  this.columns[col].setColumnData(
                    this.dataSet[this.dataSet.length - 1],
                    data
                  );
                  ie.data = this.dataSet[this.dataSet.length - 1];
                  ie.row = this.dataSet.length - 1;
                } else {
                  this.columns[col].setColumnData(this.newModel, data);
                  ie.data = this.newModel;
                  ie.row = -1;
                }
              } else {
                this.columns[col].setColumnData(this.dataSet[row], data);
                ie.data = this.dataSet[row];
                ie.row = row;
              }

              ie.column = this.columns[col];
              ie.item = data;
              this.columns[col].itemEvent.emit(ie);
            }
          }
          col++;
        });

        if (row !== -1 && row < this.dataSet.length) {
          row++;
        }
      });

      if (row !== -1 || text.split(lineSeparator).length === 1) {
        this.end.setCoord(row - 1, col - 1);
      } else {
        this.end.setCoord(this.dataSet.length - 1, col - 1);
      }
      this.selected = true;
      this.filterList = this.dataService.filterDataSet(
        this.dataSet,
        this.filterList,
        this.filters,
        this.withPagination,
        this.static,
        this.pagination
      );
      return false;
    }
  }

  updateDatasheet() {
    this.filters = this.navigatingService.initFilters(this.columns);
  }

  filterDataSet() {
    this.filterList = this.dataService.filterDataSet(
      this.dataSet,
      this.filterList,
      this.filters,
      this.withPagination,
      this.static,
      this.pagination
    );
  }

  isValid(): boolean {
    let valid = true;

    if (this.dataSet && this.columns) {
      this.dataSet.forEach((data, index) => {
        this.columns.forEach((column, j) => {
          if (!column.isValid(data, index)) {
            valid = false;
          }

          if (column.columnValidators) {
            this.touched[j][index] = true;
          }
        });
      });
    }

    return valid;
  }

  onKeyUp(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 9:
        event.preventDefault();
        break;
    }

    if (document.getElementsByClassName('cell-selected-main').length > 0) {
      const mainBound = document
        .getElementsByClassName('cell-selected-main')[0]
        .getBoundingClientRect();
      const windowBound = document.body.getBoundingClientRect();

      if (mainBound.bottom > windowBound.height) {
        window.scrollTo(0, -windowBound['y'] + mainBound.height);
      } else if (mainBound.top < 0) {
        window.scrollTo(0, window.scrollY - mainBound.height);
      }
    }
  }

  onKeyView(event: KeyboardEvent, row: number, col: number) {
    if (this.columns[col].isEditable(row)) {
      this.edited.setCoord(row, col);
    }
  }

  onKeyEdit(event: KeyboardEvent) {
    if (this.columns[this.main.col].columnValidators) {
      this.touched[this.main.col][this.main.row] = true;
    }

    switch (event.keyCode) {
      case 13: // enter
        if (
          this.newModelFunction &&
          this._dataSet.length > 0 &&
          this.main.row === this._dataSet.length - 1 &&
          this.withAdd
        ) {
          this.main.row = -1;
        } else if (this.main.row === -1) {
          this.addNewModel();
        } else if (this.main.row < this.dataSet.length - 1) {
          this.main.row++;
        }
        this.main.col = this.colOnTab;

        if (this.columns[this.main.col].autoOpen) {
          this.edited.setCoord(this.main.row, this.main.col);
        } else {
          this.edited.empty();
        }

        this.selectBox.nativeElement.focus({ preventScroll: true });
        event.preventDefault();
        break;
      case 9: // tab
        if (!event.shiftKey) {
          const next = this.renderingService.getNextColumnEditable(
            this.columns,
            true,
            this.main.col,
            this.main.col
          );
          if (next === this.main.col) {
            if (this.renderingService.isColumnEditable(this.columns, 0)) {
              this.main.col = 0;
            } else {
              this.main.col = this.renderingService.getNextColumnEditable(
                this.columns,
                true,
                0,
                0
              );
            }

            if (this.main.row < this.dataSet.length - 1) {
              this.main.row++;
            } else {
              if (!this.withAdd) {
                this.main.row = 0;
              } else {
                this.main.row = -1;
              }
            }
          } else {
            this.main.col = next;
          }
        } else {
          const next = this.renderingService.getNextColumnEditable(
            this.columns,
            false,
            this.main.col,
            this.main.col
          );
          if (next === this.main.col) {
            if (
              this.renderingService.isColumnEditable(
                this.columns,
                this.columns.length - 1
              )
            ) {
              this.main.col = this.columns.length - 1;
            } else {
              this.main.col = this.renderingService.getNextColumnEditable(
                this.columns,
                false,
                this.columns.length - 1,
                this.columns.length - 1
              );
            }

            if (this.main.row > 0) {
              this.main.row--;
            } else {
              if (!this.withAdd) {
                this.main.row = this.dataSet.length - 1;
              } else {
                this.main.row = -1;
              }
            }
          } else {
            this.main.col = next;
          }
        }

        if (this.columns[this.main.col].autoOpen) {
          this.edited.setCoord(this.main.row, this.main.col);
        } else {
          this.edited.empty();
        }

        this.selectBox.nativeElement.focus({ preventScroll: true });

        if (this.columns[this.main.col].selectOnTab
          && this.columns[this.main.col].getColumnData(this.dataSet[this.main.row])
          && this.columns[this.main.col].getColumnData(this.dataSet[this.main.row]).toString().length > 0
        ) {
          this.columns[this.main.col].componentParam['selectOnTab'] = true;
        }

        event.preventDefault();
        break;
      case 27: // esc
        this.edited.empty();
        this.selectBox.nativeElement.focus({ preventScroll: true });
        break;
      case 37: // left
        if (this.main.col > 0) {
          this.main.col = this.renderingService.getNextColumnEditable(
            this.columns,
            false,
            this.main.col,
            this.main.col
          );
          if (this.columns[this.main.col].autoOpen) {
            this.edited.setCoord(this.main.row, this.main.col);
          } else {
            this.edited.empty();
          }

          this.selectBox.nativeElement.focus({ preventScroll: true });
        }
        break;
      case 39: // right
        if (this.main.col < this.columns.length - 1) {
          this.main.col = this.renderingService.getNextColumnEditable(
            this.columns,
            true,
            this.main.col,
            this.main.col
          );
          if (this.columns[this.main.col].autoOpen) {
            this.edited.setCoord(this.main.row, this.main.col);
          } else {
            this.edited.empty();
          }

          this.selectBox.nativeElement.focus({ preventScroll: true });
        }
        break;
      case 38: // up
      case 40: // down
        this.onKeyDown(event);
        if (this.columns[this.main.col].autoOpen) {
          this.edited.setCoord(this.main.row, this.main.col);
        } else {
          this.edited.empty();
        }

        this.selectBox.nativeElement.focus({ preventScroll: true });
    }
    this.selectCellEvent.emit(
      new CellEvent(this.main, this.start, this.end, this.edited)
    );
  }

  onKeyDown(event: KeyboardEvent) {
    let controlChar = false;
    if (!this.main.isEmpty() && !event.ctrlKey) {
      if (
        !event.shiftKey ||
        (event.shiftKey &&
          [9, 13, 32, 37, 38, 39, 40].indexOf(event.keyCode) === -1)
      ) {
        this.start.empty();
        this.end.empty();
        switch (event.keyCode) {
          case 9: // tab
            const next = this.renderingService.getNextColumnSelectable(
              this.columns,
              true,
              this.main.col,
              this.main.col
            );

            if (next === this.main.col) {
              if (this.renderingService.isColumnSelectable(this.columns, 0)) {
                this.main.col = 0;
              } else {
                this.main.col = this.renderingService.getNextColumnSelectable(
                  this.columns,
                  true,
                  0,
                  0
                );
              }

              if (this.main.row < this.dataSet.length - 1) {
                this.main.row++;
              } else {
                if (!this.withAdd) {
                  this.main.row = 0;
                } else {
                  this.main.row = -1;
                }
              }
            } else {
              this.main.col = next;
            }

            event.preventDefault();
            controlChar = true;
            break;
          case 13: // enter
            if (this.columns[this.main.col].isEditable(this.main.row)) {
              this.edited.setCoord(this.main.row, this.main.col);
            }
            controlChar = true;
            break;
          case 32: // space
            if (this.globalMenu) {
              if (!this.main.isEmpty()) {
                this.selection[this.main.row] = !this.selection[this.main.row];
              }
            } else {
              if (this.columns[this.main.col].isEditable(this.main.row)) {
                this.columns[this.main.col].componentParam['type'] = 'byKey';
                this.edited.setCoord(this.main.row, this.main.col);
              }
            }

            controlChar = true;
            break;
          case 35: // end
            this.main.setCoord(
              this.dataSet.length - 1,
              this.columns.length - 1
            );
            controlChar = true;
            break;
          case 36: // home
            this.main.setCoord(0, 0);
            controlChar = true;
            break;
          case 37: // left
            if (this.main.col > 0) {
              this.main.col = this.renderingService.getNextColumnSelectable(
                this.columns,
                false,
                this.main.col,
                this.main.col
              );
            }
            controlChar = true;
            break;
          case 38: // up
            if (this.main.row > 0) {
              this.main.row--;
            } else {
              if (this.withAdd) {
                this.main.row = -1;
              } else {
                this.main.row = this.dataSet.length - 1;
              }
            }
            controlChar = true;
            break;
          case 39: // right
            if (this.main.col < this.columns.length - 1) {
              this.main.col = this.renderingService.getNextColumnSelectable(
                this.columns,
                true,
                this.main.col,
                this.main.col
              );
            }
            controlChar = true;
            break;
          case 40: // down
            if (this.main.row < this.dataSet.length - 1) {
              this.main.row++;
            } else {
              if (this.withAdd) {
                this.main.row = -1;
              } else {
                this.main.row = 0;
              }
            }
            controlChar = true;
            break;
          case 18:  // alt

            controlChar = true;
            break;
          default:
            if (
              this.columns[this.main.col].isEditable(this.main.row) &&
              event.keyCode !== 16
            ) {
              this.columns[this.main.col].componentParam['type'] = 'byKey';
              this.edited.setCoord(this.main.row, this.main.col);
            }
        }
      } else {
        if (event.keyCode === 9) {

          this.start.empty();
          this.end.empty();

          const next = this.renderingService.getNextColumnEditable(
            this.columns,
            false,
            this.main.col,
            this.main.col
          );
          if (next === this.main.col) {
            if (
              this.renderingService.isColumnEditable(
                this.columns,
                this.columns.length - 1
              )
            ) {
              this.main.col = this.columns.length - 1;
            } else {
              this.main.col = this.renderingService.getNextColumnEditable(
                this.columns,
                false,
                this.columns.length - 1,
                this.columns.length - 1
              );
            }

            if (this.main.row > 0) {
              this.main.row--;
            } else {
              if (!this.withAdd) {
                this.main.row = this.dataSet.length - 1;
              } else {
                this.main.row = -1;
              }
            }
          } else {
            this.main.col = next;
          }
        } else {
          if (this.end.isEmpty() && event.keyCode !== 16) {
            this.start.setCoord(this.main.row, this.main.col);
            this.end.setCoord(this.main.row, this.main.col);
            this.selected = true;
          }
          switch (event.keyCode) {
            case 37: // left
              if (this.end.col > 0) {
                this.end.col--;
              }
              controlChar = true;
              break;
            case 38: // up
              if (this.end.row > 0) {
                this.end.row--;
              }
              controlChar = true;
              break;
            case 39: // right
              if (this.end.col < this.columns.length - 1) {
                this.end.col++;
              }
              controlChar = true;
              break;
            case 40: // down
              if (this.end.row < this.dataSet.length - 1) {
                this.end.row++;
              }
              controlChar = true;
              break;
          }
        }

      }

      if (controlChar) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.preventDefault();
      }
    }
    this.selectCellEvent.emit(
      new CellEvent(this.main, this.start, this.end, this.edited)
    );
  }

  onFilterSortClick(event: MouseEvent) {
    this.end.empty();
    this.start.empty();
    this.edited.empty();
    this.main.empty();
    this.isValid();
  }

  onSelectAll(event: MouseEvent) {
    for (let index = 0; index < this._dataSet.length; index++) {
      this.selection[index] = true;
    }
  }

  onSelectDisplayed(event: MouseEvent) {
    for (let index = 0; index < this.filterList.length; index++) {
      this.selection[this.filterList[index]] = true;
    }
  }

  onUnselectAll(event: MouseEvent) {
    for (let index = 0; index < this._dataSet.length; index++) {
      this.selection[index] = false;
    }
  }

  goToPage(event: MouseEvent, page: number): void {
    this.pagination.currentPage = page;

    this.filterList = this.dataService.filterDataSet(
      this.dataSet,
      this.filterList,
      this.filters,
      this.withPagination,
      this.static,
      this.pagination
    );

    this.renderEvent.emit(
      new RenderEvent(this.pagination, this.filters, this.sort, this.filterList)
    );
  }

  getRenderEvent(): RenderEvent {
    return new RenderEvent(
      this.pagination,
      this.filters,
      this.sort,
      this.filterList
    );
  }

  setSelectedCell(row: number, col: number) {
    this.main.setCoord(row, col);
    this.end.empty();
    this.start.empty();
    this.edited.empty();
    this.selectBox.nativeElement.focus({ preventScroll: true });
  }

  rendering(event: RenderEvent) {
    this.filterList = event.filterList;
    this.filters = event.filters;
    this.renderEvent.emit(event);
  }

  copyFromSelectedRange(
    sRow: number,
    eRow: number,
    sCol: number,
    eCol: number,
    clear: boolean = false
  ): string {
    let txt = '';

    for (let i = sRow; i <= eRow; i++) {
      for (let j = sCol; j <= eCol; j++) {
        const str: string = this.dataService.copyType(
          this.columns[j].getColumnData(this.dataSet[i]),
          this.columns[j]
        );
        txt += str;

        if (clear) {
          this.columns[j].setColumnData(this.dataSet[i], null);
        }

        if (j < eCol) {
          txt += '\t';
        }
      }
      txt += '\r\n';
    }

    return txt;
  }

  isSelected(row: number, col: number, side: number = 0) {
    if (!this.start.isEmpty() && !this.end.isEmpty()) {
      const sRow: number =
        this.start.row < this.end.row ? this.start.row : this.end.row;
      const sCol: number =
        this.start.col < this.end.col ? this.start.col : this.end.col;
      const eRow: number =
        this.start.row > this.end.row ? this.start.row : this.end.row;
      const eCol: number =
        this.start.col > this.end.col ? this.start.col : this.end.col;

      if (sRow <= row && sCol <= col && eRow >= row && eCol >= col) {
        if (side === 0) {
          return true;
        } else {
          if (!(row === this.main.row && col === this.main.col)) {
            switch (side) {
              case 1: // top
                return sRow === row ? true : false;
              case 2: // right
                return eCol === col ? true : false;
              case 3: // bottom
                return eRow === row ? true : false;
              case 4: // left
                return sCol === col ? true : false;
            }
          }
        }
      }
    }
    return false;
  }

  copyData(event: ClipboardEvent, clear: boolean = false): void {
    if (!this.start.isEmpty() && !this.end.isEmpty()) {
      const sRow: number =
        this.start.row < this.end.row ? this.start.row : this.end.row;
      const sCol: number =
        this.start.col < this.end.col ? this.start.col : this.end.col;
      const eRow: number =
        this.start.row > this.end.row ? this.start.row : this.end.row;
      const eCol: number =
        this.start.col > this.end.col ? this.start.col : this.end.col;

      const txt = this.copyFromSelectedRange(sRow, eRow, sCol, eCol, clear);
      event.clipboardData.setData('text/plain', txt);
      event.preventDefault();
    } else if (!this.main.isEmpty()) {
      const str: string = this.dataService.copyType(
        this.columns[this.main.col].getColumnData(this.dataSet[this.main.row]),
        this.columns[this.main.col]
      );

      event.clipboardData.setData('text/plain', str);
      if (clear) {
        this.columns[this.main.col].setColumnData(
          this.dataSet[this.main.row],
          null
        );
      }
      event.preventDefault();
    }
  }

  getClassList(col: Column, obj: object, row: number) {
    if (col.cellClassFunction) {
      return col.cellClassFunction(col, obj, row);
    } else {
      return {};
    }
  }
}
