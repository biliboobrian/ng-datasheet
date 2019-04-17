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
        if (data === filterText) {
          return true;
        } else {
          return false;
        }
    }

    if (filterText) {
      return false;
    } else {
      return true;
    }
  }

  public static copyData(data: any, column: Column): string {
    if (!column.options.value) {
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
          if (!column.options.value) {
            return column.options.dataSet[i];
          } else {
            return column.options.dataSet[i][column.options.value];
          }
        }
      }
    } else if (column.options.retrieveFunction) {
      return column.options.retrieveFunction(of(data)) as Observable<any>;
    }
    return null;
  }

  ngOnInit() {

  }

  getLabel(obj: object) {
    if (!this.column.options.value) {
      if(obj) {
        return obj[this.column.options.label];
      }
      return '';
    } else {
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
    }
  }
}
