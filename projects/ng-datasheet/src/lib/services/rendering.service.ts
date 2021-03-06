import { Injectable } from '@angular/core';
import { Column } from '../models/column';
import { Sort } from '../models/sort';
import { Coordinate } from '../models/coordinate';

@Injectable({
  providedIn: 'root'
})
export class RenderingService {


  constructor() { }

  setNoWidthColumn(columns: Array<Column>, tableElement: any, dsKey: string): void {
    const maxWidth: number = tableElement.clientWidth;
    const defaultWidth: number = Math.trunc((maxWidth / columns.length));
    let noWidthFound = false;
    const userColumnsWidths: Array<number> = JSON.parse(localStorage.getItem(dsKey + 'ColumnWidths'));

    for (let i = 0; i < columns.length; i++) {
      if (!columns[i].width) {
        if (!columns[i].noWidth) {
          columns[i].width = defaultWidth;
        } else {
          noWidthFound = true;
        }
      }
    }

    if (!noWidthFound && columns.length > 0) {
      columns[columns.length - 1].width = 0;
    }

    if (userColumnsWidths) {
      for (let j = 0; j < userColumnsWidths.length; j++) {
        if (userColumnsWidths[j] > 0) {
          columns[j].width = userColumnsWidths[j];
        }
      }
    }
  }

  getNextColumnEditable(columns: Array<Column>, right: boolean, index: number, lastIndex: number) {
    if (right) {
      if (index < columns.length - 1) {
        if (columns[index + 1].editable) {
          return index + 1;
        } else {
          return this.getNextColumnEditable(columns, right, index + 1, lastIndex);
        }
      }
    } else {
      if (index > 0) {
        if (columns[index - 1].editable) {
          return index - 1;
        } else {
          return this.getNextColumnEditable(columns, right, index - 1, lastIndex);
        }
      }
    }
    return lastIndex;
  }

  getNextColumnSelectable(columns: Array<Column>, right: boolean, index: number, lastIndex: number) {
    if (right) {
      if (index < columns.length - 1) {
        if (columns[index + 1].selectable) {
          return index + 1;
        } else {
          return this.getNextColumnSelectable(columns, right, index + 1, lastIndex);
        }
      }
    } else {
      if (index > 0) {
        if (columns[index - 1].selectable) {
          return index - 1;
        } else {
          return this.getNextColumnSelectable(columns, right, index - 1, lastIndex);
        }
      }
    }
    return lastIndex;
  }

  getColumnWidth(column: Column) {
    if (column && column.width > 0) {
      return { width: column.width + 'px' };
    } else {
      return {};
    }
  }

  isColumnSelectable(columns: Array<Column>, index: number) {
    if (columns[index].selectable) {
      return true;
    } else {
      return false;
    }
  }

  isColumnEditable(columns: Array<Column>, index: number) {
    if (columns[index].editable) {
      return true;
    } else {
      return false;
    }
  }

  isVisible(filterList: Array<number>, row: number) {
    if (filterList) {
      let visible = false;
      filterList.forEach(rowFilter => {
        if (rowFilter === row) {
          visible = true;
        }
      });
      return visible;
    } else {
      return true;
    }
  }

  isColumnSorted(sort: Sort, col: Column): number {
    if (sort && sort.column) {
      if (sort.column.options && sort.column.options.label
        && col.options && col.options.label) {
        if (sort.column.options.label === col.options.label) {
          if (sort.asc) {
            return 1;
          } else {
            return -1;
          }
        } else {
          return 0;
        }

      } else {
        if (sort.column.data === col.data) {
          if (sort.asc) {
            return 1;
          } else {
            return -1;
          }
        } else {
          return 0;
        }
      }
    } else {
      return 0;
    }
  }

  isNeededForAdd(column: Column) {
    if (!column || !column.neededForAdd) {
      return false;
    } else {
      return true;
    }
  }

  isSelectedMain(main: Coordinate, row: number, col: number) {

    if (!main.isEmpty() && main.row === row && main.col === col) {
      return true;
    }
    return false;
  }

  isEdited(edited: Coordinate, row: number, col: number) {
    if (!edited.isEmpty() && edited.row === row && edited.col === col) {
      return true;
    } else {
      return false;
    }
  }

  previousNoWidth(columns: Array<Column>, index: number) {
    let previousNoWidth = false;

    for (let i = 0; i < index; i++) {
      if (columns[i].noWidth) {
        previousNoWidth = true;
      }
    }

    return previousNoWidth;
  }
}
