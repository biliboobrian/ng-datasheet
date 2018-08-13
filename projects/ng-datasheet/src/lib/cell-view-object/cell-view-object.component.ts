import { Component, OnInit } from '@angular/core';
import { CellDynamicComponent } from '../Cell/cell-dynamic-component';
import { CellDynamicInterface } from '../Cell/cell-dynamic-interface';
import { Column } from '../models/column';
import { Observable, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'ds-cell-view-object',
  templateUrl: './cell-view-object.component.html',
  styleUrls: ['./cell-view-object.component.css']
})
export class CellViewObjectComponent extends CellDynamicComponent implements OnInit, CellDynamicInterface {

  constructor() {
    super();
  }

  public static copyData(data: any, column: Column): string {
    if (data && column.options.label) {
      return data[column.options.label];
    } else {
      return null;
    }

  }


  public static pasteData(data: string, column: Column): any {
    if (column.options.dataSet) {
      for (let i = 0; i < column.options.dataSet.length; i++) {
        if (column.options.dataSet[i][column.options.label] === data) {
          return column.options.dataSet[i];
        }
      }
    } else if (column.options.retreiveFunction) {
      const objFunction = column.options.retreiveFunction() as Observable<any>;
      const subObjFunction: Subscription = objFunction.subscribe(element => {
        subObjFunction.unsubscribe();
        return element;
      });
    }
    return null;
  }

  ngOnInit() {


  }

  getLabel(obj: object) {
    if (this.column && this.column.options && obj) {
      return obj[this.column.options.label];
    }
    return '';
  }
}
