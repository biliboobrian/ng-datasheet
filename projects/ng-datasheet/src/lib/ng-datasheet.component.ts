import { DateParserFormatter } from './cell-edit-date/date-parser-formatter';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Sort } from './models/sort';
import { Column } from './models/column';
import { Component, OnInit, Input, ViewChild, EventEmitter, Output, ElementRef } from '@angular/core';
import { Pagination } from './models/pagination';
import { Filter } from './models/filter';
import { RenderEvent } from './models/render-event';
import { ParameterButton } from './models/parameter-button';
import { NavigatingService } from './services/navigating.service';
import { RenderingService } from './services/rendering.service';
import { ResizingService } from './services/resizing.service';
import { DataService } from './services/data.service';
import { Coordinate } from './models/coordinate';

let COL_FORMAT = '';

// @dynamic
@Component({
  selector: 'ds-datasheet',
  templateUrl: 'ng-datasheet.component.html',
  styleUrls: ['ng-datasheet.component.css'],
  providers: [
    {
      provide: NgbDateParserFormatter,
      useFactory: () => new DateParserFormatter(COL_FORMAT)
    }
  ]
})
export class NgDatasheetComponent implements OnInit {

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

    this.filterList = this.dataService.filterDataSet(
      this.dataSet,
      this.filterList,
      this.filters,
      this.withPagination,
      this.static,
      this.pagination
    );
  }

  get columns(): Array<Column> {
    return this._columns;
  }

  @Input('columns') set columns(val: Array<Column>) {
    this._columns = val;
    if (this._columns && this.tbl.nativeElement) {
      this.renderingService.setNoWidthColumn(this.columns, this.tbl.nativeElement, this.dsKey);
    }
  }

  @Input() public parameterButtons: Array<ParameterButton>;
  @Input() public withFilters = true;
  @Input() public paginated = false;
  @Input() public withAdd = true;
  @Input() public primaryKey = 'id';
  @Input() public newModelFunction: Function;
  @Input() public dateFormat = 'MM-DD-YYYY';
  @Input() public static = true;
  @Input() public withPagination = false;
  @Input() public filters: Array<Filter>;
  @Input() public pagination: Pagination;
  @Input() public sort: Sort;
  @Input() public dsKey: string;

  @Output() public renderEvent: EventEmitter<RenderEvent> = new EventEmitter<RenderEvent>();

  @ViewChild('selectBox', { read: ElementRef }) selectBox: ElementRef;
  @ViewChild('tbl', { read: ElementRef }) tbl: ElementRef;

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

  private _dataSet: Array<Object>;
  private _columns: Array<Column>;


  constructor(
    public navigatingService: NavigatingService,
    public renderingService: RenderingService,
    public resizingService: ResizingService,
    public dataService: DataService
  ) { }

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
        this.renderingService.setNoWidthColumn(this.columns, this.tbl.nativeElement, this.dsKey);
      }

    }

    if (this.withAdd && this.newModelFunction) {
      this.newModel = this.newModelFunction();
    }
  }

  onMouseDown(event: MouseEvent, obj: Object, row: number, col: number) {
    if (this.columns[col].selectable) {
      this.main.setCoord(row, col);
      this.colOnTab = col;
      this.end.empty();

      if (this.edited.row !== row || this.edited.col !== col) {
        this.edited.empty();
      }

      if (row !== -1 && this.edited.isEmpty()) {
        this.selected = false;
        this.start.setCoord(row, col);
      }
    }
  }

  onMouseOver(event: MouseEvent, obj: Object, row: number, col: number) {
    if (!this.selected) {
      this.end.setCoord(row, col);
    }
  }

  onMouseUp(event: MouseEvent, obj: Object, row: number, col: number) {

    if (!this.selected) {
      if (row !== -1) {
        this.end.setCoord(row, col);
      } else {
        this.end.setCoord(this.dataSet.length - 1, col);
      }
    }

    if (this.start.row === row && this.start.col === col) {
      this.start.empty();
      this.end.empty();
    }

    this.selected = true;

    if (this.edited.isEmpty()) {
      this.selectBox.nativeElement.focus({ preventScroll: true });
    }
  }

  onDblClick(evnt: MouseEvent, row: number, col: number) {
    if (this.columns[col].editable) {
      this.edited.setCoord(row, col);
    }
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

      if (this.main.row !== -1) {
        this.start.setCoord(this.main.row, this.main.col);
      } else {
        this.start.setCoord(this.dataSet.length, this.main.col);
        this.main.setCoord(this.dataSet.length, this.main.col);
      }

      let lineSeparator = '\r\n';

      if (text.indexOf(lineSeparator) === -1) {
        lineSeparator = '\n';
      }

      text.split(lineSeparator).forEach(rowPaste => {
        col = this.main.col;

        if (this.withAdd && this.newModelFunction) {
          if (row === -1 || row === this.dataSet.length) {
            this.dataSet.push(this.newModelFunction());
          }
          rowPaste.split('\t').forEach(colPaste => {
            if (this.columns[col] && this.columns[col].editable) {
              const data: any = this.dataService.pasteType(colPaste, this.columns[col]);
              if (row === -1) {
                this.dataSet[this.dataSet.length - 1][this.columns[col].data] = data;
              } else {
                this.dataSet[row][this.columns[col].data] = data;
              }
            }
            col++;
          });
        }
        if (row !== -1) {
          row++;
        }
      });

      if (row !== -1) {
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

  onKeyUp(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 9:
        event.preventDefault();
        break;
    }
  }

  onKeyView(event: KeyboardEvent) {

  }

  onKeyEdit(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 13: // enter
        if (this.withAdd && this.newModelFunction
          && this._dataSet.length > 0
          && this.main.row === this._dataSet.length - 1) {
          this.main.row = -1;
        } else if (this.main.row === -1) {
          this.dataSet.push(this.newModel);
          this.printNew = false;
          delete (this.newModel);
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
        } else if (this.main.row < this.dataSet.length - 1) {
          this.main.row++;
        }
        this.main.col = this.colOnTab;
        this.edited.setCoord(this.main.row, this.main.col);
        break;
      case 9: // tab
        const next = this.renderingService.getNextColumnEditable(this.columns, true, this.main.col, this.main.col);
        if (next === this.main.col) {
          if (this.renderingService.isColumnEditable(this.columns, 0)) {
            this.main.col = 0;
          } else {
            this.main.col = this.renderingService.getNextColumnEditable(this.columns, true, 0, 0);
          }

          if (this.main.row < this.dataSet.length - 1) {
            this.main.row++;
          } else {
            this.main.row = -1;
          }
        } else {
          this.main.col = next;
        }
        this.edited.setCoord(this.main.row, this.main.col);
        event.preventDefault();
        break;
      case 27: // esc
        this.edited.empty();
        this.selectBox.nativeElement.focus();
        break;
      case 37: // left
        if (this.main.col > 0) {
          this.main.col = this.renderingService.getNextColumnEditable(this.columns, false, this.main.col, this.main.col);
          this.edited.setCoord(this.main.row, this.main.col);
        }
        break;
      case 39: // right
        if (this.main.col < this.columns.length - 1) {
          this.main.col = this.renderingService.getNextColumnEditable(this.columns, true, this.main.col, this.main.col);
          this.edited.setCoord(this.main.row, this.main.col);
        }
        break;
      case 38: // up
      case 40: // down
        this.onKeyDown(event);
        this.edited.setCoord(this.main.row, this.main.col);
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.main && !event.ctrlKey) {
      if (!event.shiftKey) {
        this.start.empty();
        this.end.empty();
        switch (event.keyCode) {
          case 9: // tab
            const next = this.renderingService.getNextColumnSelectable(this.columns, true, this.main.col, this.main.col);
            if (next === this.main.col) {
              if (this.renderingService.isColumnSelectable(this.columns, 0)) {
                this.main.col = 0;
              } else {
                this.main.col = this.renderingService.getNextColumnSelectable(this.columns, true, 0, 0);
              }

              if (this.main.row < this.dataSet.length - 1) {
                this.main.row++;
              } else {
                this.main.row = -1;
              }
            } else {
              this.main.col = next;
            }
            event.preventDefault();
            break;
          case 13: // enter
            if (this.columns[this.main.col].editable) {
              this.edited.setCoord(this.main.row, this.main.col);
            }
            break;
          case 32: // space
            if (this.main) {
              this.selection[this.main.row] = !this.selection[this.main.row];
            }
            break;
          case 35: // end
            this.main.setCoord(this.dataSet.length - 1, this.columns.length - 1);
            break;
          case 36: // home
            this.main.setCoord(0, 0);
            break;
          case 37: // left
            if (this.main.col > 0) {
              this.main.col = this.renderingService.getNextColumnSelectable(this.columns, false, this.main.col, this.main.col);
            }
            break;
          case 38: // up
            if (this.main.row >= 0) {
              this.main.row--;
            } else {
              this.main.row = this.dataSet.length - 1;
            }
            break;
          case 39: // right
            if (this.main.col < this.columns.length - 1) {
              this.main.col = this.renderingService.getNextColumnSelectable(this.columns, true, this.main.col, this.main.col);
            }
            break;
          case 40: // down
            if (this.main.row < this.dataSet.length - 1) {
              this.main.row++;
            } else {
              this.main.row = -1;
            }
            break;

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
            break;
          case 38: // up
            if (this.end.row > 0) {
              this.end.row--;
            }
            break;
          case 39: // right
            if (this.end.col < this.columns.length - 1) {
              this.end.col++;
            }
            break;
          case 40: // down
            if (this.end.row < this.dataSet.length - 1) {
              this.end.row++;
            }
            break;
        }
      }
    }
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

    this.renderEvent.emit(new RenderEvent(this.pagination, this.filters, this.sort));
  }

  copyFromSelectedRange(sRow: number, eRow: number, sCol: number, eCol: number, clear: boolean = false): string {
    let txt = '';

    for (let i = sRow; i <= eRow; i++) {
      for (let j = sCol; j <= eCol; j++) {
        const str: string = this.dataService.copyType(this.dataSet[i][this.columns[j]['data']], this.columns[j]);
        txt += str;

        if (clear) {
          this.dataSet[i][this.columns[j]['data']] = null;
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
      const sRow: number = (this.start.row < this.end.row) ? this.start.row : this.end.row;
      const sCol: number = (this.start.col < this.end.col) ? this.start.col : this.end.col;
      const eRow: number = (this.start.row > this.end.row) ? this.start.row : this.end.row;
      const eCol: number = (this.start.col > this.end.col) ? this.start.col : this.end.col;

      if ((sRow <= row && sCol <= col) && (eRow >= row && eCol >= col)) {
        if (side === 0) {
          return true;
        } else {
          switch (side) {
            case 1: // top
              return (sRow === row) ? true : false;
            case 2: // right
              return (eCol === col) ? true : false;
            case 3: // bottom
              return (eRow === row) ? true : false;
            case 4: // left
              return (sCol === col) ? true : false;
          }
        }

      }

    }
    return false;
  }

  copyData(event: ClipboardEvent, clear: boolean = false): void {
    if (!this.start.isEmpty() && !this.end.isEmpty()) {
      const sRow: number = (this.start.row < this.end.row) ? this.start.row : this.end.row;
      const sCol: number = (this.start.col < this.end.col) ? this.start.col : this.end.col;
      const eRow: number = (this.start.row > this.end.row) ? this.start.row : this.end.row;
      const eCol: number = (this.start.col > this.end.col) ? this.start.col : this.end.col;

      const txt = this.copyFromSelectedRange(sRow, eRow, sCol, eCol, clear);
      event.clipboardData.setData('text/plain', txt);
      event.preventDefault();
    } else if (this.main) {
      const str: string = this.dataService.copyType(
        this.dataSet[this.main.row][this.columns[this.main.col]['data']],
        this.columns[this.main.col]
      );

      event.clipboardData.setData('text/plain', str);
      if (clear) {
        this.dataSet[this.main.row][this.columns[this.main.col]['data']] = null;
      }
      event.preventDefault();
    }
  }
}
