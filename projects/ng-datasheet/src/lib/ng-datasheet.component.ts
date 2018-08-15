import { DateParserFormatter } from './cell-edit-date/date-parser-formatter';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Sort } from './models/sort';
import { Column } from './models/column';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Pagination } from './models/pagination';
import { Filter } from './models/filter';

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
  _dataSet: Array<Object>;
  get dataSet(): Array<Object> {
    return this._dataSet;
  }

  @Input('dataSet')
  set dataSet(val: Array<Object>) {
    this._dataSet = val;

    if (this.withPagination && this.static) {
      this.pagination = new Pagination();
      this.pagination.currentPage = 0;
      this.pagination.perPage = 15;
      this.pagination.total = this.dataSet.length;
      this.filterDataSet();
    }
  }

  @Input() public columns: Array<Column>;
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

  @ViewChild('selectBox') selectBox;
  @ViewChild('tbl') tbl;

  public selection: Object = {};
  public newModel: Object;
  public printNew = true;

  private start: Array<number>;
  private end: Array<number>;
  private main: Array<number>;
  private edited: Array<number>;
  private selected: Boolean = false;
  private filterList: Array<number>;
  private colOnTab: number;

  constructor() { }

  ngOnInit() {
    if (this.columns) {
      // datePicker trick for ng-bootstrap date parsing
      COL_FORMAT = this.dateFormat;

      const maxWidth: number = this.tbl.nativeElement.clientWidth;
      const defaultWidth: number = Math.trunc((maxWidth / this.columns.length));

      let noWidthFound = false;
      let initFilters = false;
      let initSort = false;

      if (!this.filters) {
        this.filters = new Array<Filter>();
        initFilters = true;
      }

      if (!this.sort) {
        this.sort = new Sort();
        initSort = true;
      }

      if (this.withPagination && this.static && !this.pagination && this.dataSet) {
        this.pagination = new Pagination();
        this.pagination.currentPage = 0;
        this.pagination.perPage = 15;
        this.pagination.total = this.dataSet.length;
        this.filterDataSet();
      }


      for (let i = 0; i < this.columns.length; i++) {
        if (!this.columns[i].width) {
          if (!this.columns[i].noWidth) {
            this.columns[i].width = defaultWidth;
          } else {
            noWidthFound = true;
          }
        }

        if (initFilters) {
          const filter: Filter = new Filter(this.columns[i]);
          this.filters.push(filter);
        }
      }


      if (!noWidthFound) {
        this.columns[this.columns.length - 1].width = 0;
      }
    }

    if (this.withAdd && this.newModelFunction) {
      this.newModel = this.newModelFunction();
    }
  }

  onMouseDown(event: MouseEvent, obj: Object, row: number, col: number) {
    if (this.columns[col].selectable) {
      this.main = [row, col];
      this.colOnTab = col;
      this.end = null;

      if (this.edited && (this.edited[0] !== row || this.edited[1] !== col)) {
        this.edited = null;
      }

      if (row !== -1 && !this.edited) {
        this.selected = false;
        this.start = [row, col];
      }
    }
  }

  onMouseOver(event: MouseEvent, obj: Object, row: number, col: number) {
    if (!this.selected) {
      this.end = [row, col];
    }
  }

  onMouseUp(event: MouseEvent, obj: Object, row: number, col: number) {

    if (!this.selected) {
      if (row !== -1) {
        this.end = [row, col];
      } else {
        this.end = [this.dataSet.length - 1, col];
      }
    }

    if (this.start && this.start[0] === row && this.start[1] === col) {
      this.start = null;
      this.end = null;
    }

    this.selected = true;

    if (!this.edited) {
      this.selectBox.nativeElement.focus({ preventScroll: true });
    }
  }

  onDblClick(evnt: MouseEvent, row: number, col: number) {
    if (this.columns[col].editable) {
      this.edited = [row, col];
    }
  }

  onCopy(event: ClipboardEvent) {
    this.copyData(event);
  }

  onCut(event: ClipboardEvent) {
    this.copyData(event, true);
  }

  onPaste(event: ClipboardEvent) {
    if (this.main && !this.edited) {
      let text: string = event.clipboardData.getData('text/plain');
      text = text.trim();

      let row: number = this.main[0];
      let col: number = this.main[1];

      if (this.main[0] !== -1) {
        this.start = [this.main[0], this.main[1]];
      } else {
        this.start = [this.dataSet.length, this.main[1]];
        this.main = [this.dataSet.length, this.main[1]];
      }

      let lineSeparator = '\r\n';

      if (text.indexOf(lineSeparator) === -1) {
        lineSeparator = '\n';
      }

      text.split(lineSeparator).forEach(rowPaste => {
        col = this.main[1];

        if (this.withAdd && this.newModelFunction) {
          if (row === -1 || row === this._dataSet.length) {
            this._dataSet.push(this.newModelFunction());
          }
          rowPaste.split('\t').forEach(colPaste => {
            if (this.columns[col] && this.columns[col].editable) {
              const data: any = this.pasteType(colPaste, this.columns[col]);
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
        this.end = [row - 1, col - 1];
      } else {
        this.end = [this.dataSet.length - 1, col - 1];
      }
      this.selected = true;
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

  insertNewObject(): void {
    this._dataSet.push(this.newModel);
  }


  onKeyEdit(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 13: // enter
        if (this.withAdd && this.newModelFunction
          && this._dataSet.length > 0
          && this.main[0] === this._dataSet.length - 1) {
          this.main[0] = -1;
        } else if (this.main[0] === -1) {
          this.insertNewObject();
          this.printNew = false;
          delete (this.newModel);
          this.newModel = this.newModelFunction();
          this.filterDataSet();
          setTimeout(() => {
            this.printNew = true;
          }, 10);
        } else if (this.main[0] < this.dataSet.length - 1) {
          this.main[0]++;
        }
        this.main[1] = this.colOnTab;
        this.edited = [this.main[0], this.main[1]];
        break;
      case 9: // tab
        const next = this.getNextColumnEditable(true, this.main[1], this.main[1]);
        if (next === this.main[1]) {
          if (this.isColumnEditable(0)) {
            this.main[1] = 0;
          } else {
            this.main[1] = this.getNextColumnEditable(true, 0, 0);
          }

          if (this.main[0] < this.dataSet.length - 1) {
            this.main[0]++;
          } else {
            this.main[0] = -1;
          }
        } else {
          this.main[1] = next;
        }
        this.edited = [this.main[0], this.main[1]];
        event.preventDefault();
        break;
      case 27: // esc
        this.edited = null;
        this.selectBox.nativeElement.focus();
        break;
      case 37: // left
        if (this.main[1] > 0) {
          this.main[1] = this.getNextColumnEditable(false, this.main[1], this.main[1]);
          this.edited = [this.main[0], this.main[1]];
        }
        break;
      case 39: // right
        if (this.main[1] < this.columns.length - 1) {
          this.main[1] = this.getNextColumnEditable(true, this.main[1], this.main[1]);
          this.edited = [this.main[0], this.main[1]];
        }
        break;
      case 38: // up
      case 40: // down
        this.onKeyDown(event);
        this.edited = [this.main[0], this.main[1]];
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.main && !event.ctrlKey) {
      if (!event.shiftKey) {
        this.start = null;
        this.end = null;
        switch (event.keyCode) {
          case 9: // tab
            const next = this.getNextColumnSelectable(true, this.main[1], this.main[1]);
            if (next === this.main[1]) {
              if (this.isColumnSelectable(0)) {
                this.main[1] = 0;
              } else {
                this.main[1] = this.getNextColumnSelectable(true, 0, 0);
              }

              if (this.main[0] < this.dataSet.length - 1) {
                this.main[0]++;
              } else {
                this.main[0] = -1;
              }
            } else {
              this.main[1] = next;
            }
            event.preventDefault();
            break;
          case 13: // enter
            if (this.columns[this.main[1]].editable) {
              this.edited = [this.main[0], this.main[1]];
            }
            break;
          case 32: // space
            if (this.main) {
              this.selection[this.main[0]] = !this.selection[this.main[0]];
            }
            break;
          case 35: // end
            this.main = [this.dataSet.length - 1, this.columns.length - 1];
            break;
          case 36: // home
            this.main = [0, 0];
            break;
          case 37: // left
            if (this.main[1] > 0) {
              this.main[1] = this.getNextColumnSelectable(false, this.main[1], this.main[1]);
            }
            break;
          case 38: // up
            if (this.main[0] >= 0) {
              this.main[0]--;
            } else {
              this.main[0] = this.dataSet.length - 1;
            }
            break;
          case 39: // right
            if (this.main[1] < this.columns.length - 1) {
              this.main[1] = this.getNextColumnSelectable(true, this.main[1], this.main[1]);
            }
            break;
          case 40: // down
            if (this.main[0] < this.dataSet.length - 1) {
              this.main[0]++;
            } else {
              this.main[0] = -1;
            }
            break;

        }
      } else {
        if (!this.end && event.keyCode !== 16) {
          this.start = [this.main[0], this.main[1]];
          this.end = [this.main[0], this.main[1]];
          this.selected = true;
        }
        switch (event.keyCode) {
          case 37: // left
            if (this.end[1] > 0) {
              this.end[1]--;
            }
            break;
          case 38: // up
            if (this.end[0] > 0) {
              this.end[0]--;
            }
            break;
          case 39: // right
            if (this.end[1] < this.columns.length - 1) {
              this.end[1]++;
            }
            break;
          case 40: // down
            if (this.end[0] < this.dataSet.length - 1) {
              this.end[0]++;
            }
            break;
        }
      }

    }

  }

  getColumnWidth(column: Column) {
    if (column.width > 0) {
      return { width: column.width + 'px' };
    } else {
      return {};
    }
  }

  isColumnSelectable(index: number) {
    if (this.columns[index].selectable) {
      return true;
    } else {
      return false;
    }
  }

  isColumnEditable(index: number) {
    if (this.columns[index].editable) {
      return true;
    } else {
      return false;
    }
  }

  getNextColumnSelectable(right: boolean, index: number, lastIndex: number) {
    if (right) {
      if (index < this.columns.length - 1) {
        if (this.columns[index + 1].selectable) {
          return index + 1;
        } else {
          return this.getNextColumnSelectable(right, index + 1, lastIndex);
        }
      }
    } else {
      if (index > 0) {
        if (this.columns[index - 1].selectable) {
          return index - 1;
        } else {
          return this.getNextColumnSelectable(right, index - 1, lastIndex);
        }
      }
    }
    return lastIndex;
  }

  getNextColumnEditable(right: boolean, index: number, lastIndex: number) {
    if (right) {
      if (index < this.columns.length - 1) {
        if (this.columns[index + 1].editable) {
          return index + 1;
        } else {
          return this.getNextColumnEditable(right, index + 1, lastIndex);
        }
      }
    } else {
      if (index > 0) {
        if (this.columns[index - 1].editable) {
          return index - 1;
        } else {
          return this.getNextColumnEditable(right, index - 1, lastIndex);
        }
      }
    }
    return lastIndex;
  }

  onSort(event: MouseEvent, col: Column) {
    if (col.sortable) {
      if (this.sort && this.sort.column === col) {
        this.sort.asc = !this.sort.asc;
      } else {
        this.sort = new Sort();
        this.sort.column = col;
      }

      this.sortDataSet();
    }
  }

  onFilterChange(event, col) {
    if (this.withPagination && this.static) {
      this.pagination.currentPage = 0;
    }

    this.filterDataSet();
  }

  onSelectAll(event: MouseEvent) {
    for (let index = 0; index < this._dataSet.length; index++) {
      this.selection[index] = true;
    }
  }

  onUnselectAll(event: MouseEvent) {
    for (let index = 0; index < this._dataSet.length; index++) {
      this.selection[index] = false;
    }
  }

  goToFirstPage(event: MouseEvent): void {
    this.pagination.currentPage = 0;
    this.filterDataSet();
  }

  goToPreviousPage(event: MouseEvent): void {
    this.pagination.currentPage--;
    this.filterDataSet();
  }

  goToPage(event: MouseEvent, page: number): void {
    this.pagination.currentPage = page;
    this.filterDataSet();
  }

  goToNextPage(event: MouseEvent): void {
    this.pagination.currentPage++;
    this.filterDataSet();
  }

  goToLastPage(event: MouseEvent): void {
    this.pagination.currentPage = this.pagination.lastPage;
    this.filterDataSet();
  }

  filterDataSet(): void {
    this.filterList = new Array<number>();

    for (let i = 0; i < this._dataSet.length; i++) {
      const obj = this._dataSet[i];
      let visible = true;

      for (const index in this.filters) {
        if (this.filters.hasOwnProperty(index)
          && this.filters[index].value
          && this.filters[index].value !== '') {

          const keywords = this.filters[index].value.split(' ').join('|');
          if (obj[this.filters[index].column.data]) {
            const txt: string = this.copyType(obj[this.filters[index].column.data], this.filters[index].column);
            if (!txt.toString().match(new RegExp('(' + keywords + ')', 'gi'))) {
              visible = false;
            }
          } else {
            visible = false;
          }
        }
      }

      if (visible) {
        this.filterList.push(i);
      }
    }

    if (this.withPagination && this.static) {
      this.pagination.total = this.filterList.length;

      const paginatedList: Array<number> = [];
      for (let index = this.pagination.currentPage * this.pagination.perPage;
        index < (this.pagination.currentPage + 1) * this.pagination.perPage;
        index++) {
        if (this.filterList[index]) {
          paginatedList.push(this.filterList[index]);
        }

      }

      this.filterList = paginatedList;
    }

  }

  sortDataSet(): void {
    this.dataSet.sort((a, b) => {
      if (this.sort) {
        if (!a[this.sort.column.data]
          || !this.copyType(a[this.sort.column.data], this.sort.column)
          || this.copyType(a[this.sort.column.data], this.sort.column) === '') {
          return 1;
        }

        if (!b[this.sort.column.data]
          || !this.copyType(b[this.sort.column.data], this.sort.column)
          || this.copyType(b[this.sort.column.data], this.sort.column) === '') {
          return -1;
        }

        if (this.copyType(a[this.sort.column.data], this.sort.column).toLowerCase()
          < this.copyType(b[this.sort.column.data], this.sort.column).toLowerCase()) {
          return (this.sort.asc) ? -1 : 1;
        }

        if (this.copyType(b[this.sort.column.data], this.sort.column).toLowerCase()
          < this.copyType(a[this.sort.column.data], this.sort.column).toLowerCase()) {
          return (this.sort.asc) ? 1 : -1;
        }
      }
      return 0;
    });
    this.filterDataSet();
  }

  copyFromSelectedRange(sRow: number, eRow: number, sCol: number, eCol: number, clear: boolean = false): string {
    let txt = '';

    for (let i = sRow; i <= eRow; i++) {
      for (let j = sCol; j <= eCol; j++) {
        const str: string = this.copyType(this.dataSet[i][this.columns[j]['data']], this.columns[j]);
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

  isVisible(row: number) {
    if (this.filterList) {
      let visible = false;
      this.filterList.forEach(rowFilter => {
        if (rowFilter === row) {
          visible = true;
        }
      });
      return visible;
    } else {
      return true;
    }
  }

  isColumnSorted(col: string): number {
    if (this.sort && this.sort.column && this.sort.column.data === col) {
      if (this.sort.asc) {
        return 1;
      } else {
        return -1;
      }
    } else {
      return 0;
    }
  }

  isNeededForAdd(col: number = -1) {
    const column: Column = this.columns[col];

    if (!column || !column.neededForAdd) {
      return false;
    } else {
      return true;
    }
  }

  isSelected(row: number, col: number, side: number = 0) {

    if (this.start && this.end) {
      const sRow: number = (this.start[0] < this.end[0]) ? this.start[0] : this.end[0];
      const sCol: number = (this.start[1] < this.end[1]) ? this.start[1] : this.end[1];
      const eRow: number = (this.start[0] > this.end[0]) ? this.start[0] : this.end[0];
      const eCol: number = (this.start[1] > this.end[1]) ? this.start[1] : this.end[1];

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

  isSelectedMain(row: number, col: number) {

    if (this.main && this.main[0] === row && this.main[1] === col) {
      return true;
    }
    return false;
  }

  isEdited(row: number, col: number) {
    if (this.edited && this.edited[0] === row && this.edited[1] === col) {
      return true;
    } else {
      return false;
    }
  }

  copyData(event: ClipboardEvent, clear: boolean = false): void {
    if (this.start && this.end) {
      const sRow: number = (this.start[0] < this.end[0]) ? this.start[0] : this.end[0];
      const sCol: number = (this.start[1] < this.end[1]) ? this.start[1] : this.end[1];
      const eRow: number = (this.start[0] > this.end[0]) ? this.start[0] : this.end[0];
      const eCol: number = (this.start[1] > this.end[1]) ? this.start[1] : this.end[1];

      const txt = this.copyFromSelectedRange(sRow, eRow, sCol, eCol, clear);
      event.clipboardData.setData('text/plain', txt);
      event.preventDefault();
    } else if (this.main) {
      const str: string = this.copyType(this.dataSet[this.main[0]][this.columns[this.main[1]]['data']], this.columns[this.main[1]]);
      event.clipboardData.setData('text/plain', str);
      if (clear) {
        this.dataSet[this.main[0]][this.columns[this.main[1]]['data']] = null;
      }
      event.preventDefault();
    }
  }

  copyType(data: any, column: Column): string {
    return column.cellView['copyData'](data, column);
  }


  pasteType(data: string, column: Column): any {
    return column.cellView['pasteData'](data, column);
  }
}
