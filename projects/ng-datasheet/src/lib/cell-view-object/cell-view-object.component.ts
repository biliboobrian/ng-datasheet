import { Component, OnInit } from '@angular/core';
import { CellDynamicComponent } from '../cell/cell-dynamic-component';
import { CellDynamicInterface } from '../cell/cell-dynamic-interface';
import { Column } from '../models/column';
import { Observable, of } from 'rxjs';
import * as moment_ from 'moment';
const moment = moment_;


@Component({
  selector: 'ds-cell-view-object',
  templateUrl: './cell-view-object.component.html',
  styleUrls: ['./cell-view-object.component.css']
})
export class CellViewObjectComponent extends CellDynamicComponent implements OnInit, CellDynamicInterface {

  constructor() {
    super();
  }

  public static filter(data: any, filterText: any, column: Column): boolean {
    if (filterText && data) {
      if (column.type && column.type === 'object') {
        let keywords = '';

        if (filterText[column.options.label] !== undefined) {
          keywords = filterText[column.options.label];
        } else {
          keywords = this.escapeRegExp(filterText).split(' ').join('|');
        }

        if (data[column.options.label] !== null) {
          if (keywords.indexOf('\\*') === 0) {
            if (!data[column.options.label].toString().match(new RegExp('(' + keywords.substring(2) + ')', 'gi'))) {
              return false;
            }
          } else {

            if (!data[column.options.label].toString().match(new RegExp('^(' + keywords + ')', 'gi'))) {
              return false;
            }
          }
          return true;
        } else {
          return false;
        }
      } if (column.type && column.type === 'date') {
        if (data[column.options.label].toString() === filterText.toString()) {
          return true;
        } else {
          return false;
        }
      } else {
        if (data === filterText) {
          return true;
        } else {
          return false;
        }
      }
    }

    if (filterText) {
      return false;
    } else {
      return true;
    }
  }

  public static copyData(data: any, column: Column): string {
    if (column.type && column.type === 'string') {
      const elem = column.options.dataSet.find(element => {
        return element[column.options.value] === data;
      });

      if (column.options.label) {
        if (elem) {
          return elem[column.options.label];
        } else {
          return '';
        }
      } else {
        return data;
      }
    } else if (column.type && column.type === 'date') {
      if (data && column.options.label && column.options.format) {
        return data[column.options.label].format(column.options.format);
      } else {
        return data;
      }
    } else {
      if (data && column.options.label) {
        return data[column.options.label];
      } else {
        return data;
      }
    }
  }


  public static pasteData(data: any, column: Column): any {
    if (column.options.dataSet) {
      for (let i = 0; i < column.options.dataSet.length; i++) {
        if (column.options.dataSet[i][column.options.label] === data) {
          if (column.type && column.type === 'string') {
            return column.options.dataSet[i][column.options.value];
          } else {
            return column.options.dataSet[i];
          }
        }
      }
    } else if (column.options.retreiveFunction) {
      return column.options.retreiveFunction(of(data)) as Observable<any>;
    }
    return null;
  }

  ngOnInit() {


  }

  getLabel(obj: object) {
    if (this.column.type && this.column.type === 'string') {
      let elem: object;
      if (this.column.options.dataSet) {
        elem = this.column.options.dataSet.find(element => {
          return element[this.column.options.value] === obj;
        });
      }

      if (elem) {
        return elem[this.column.options.label];
      } else {
        return '';
      }
    } else if (this.column.type && this.column.type === 'date') {
      if (this.column && this.column.options && obj) {
        return this.formatDate(obj[this.column.options.label], this.column.options.format);
      }
      return '';
    } else {
      if (this.column && this.column.options && obj) {
        if (Array.isArray(this.column.options.label)) {
          return this.getLbl(obj, this.column.options.label);
        } else {
          return obj[this.column.options.label];
        }
      }
      return '';
    }
  }

  getLbl(obj: object, props: Array<string>) {
    const prop: string = props[0];
    if (props.length === 1) {
      if(obj) {
        return obj[prop];
      } else {
        return '';
      }
    } else {
      return this.getLbl(obj[prop], props.slice(1));
    }
  }


  formatDate(date: moment_.Moment, format): string {
    if (date && format) {
      return date.format(format);
    }
    return '';
  }
}
