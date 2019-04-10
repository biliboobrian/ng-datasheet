import { Component, OnInit } from '@angular/core';
import { CellDynamicComponent } from '../cell/cell-dynamic-component';
import { CellDynamicInterface } from '../cell/cell-dynamic-interface';
import { Column } from '../models/column';


@Component({
  selector: 'ds-cell-view-number',
  templateUrl: './cell-view-number.component.html',
  styleUrls: ['./cell-view-number.component.css']
})
export class CellViewNumberComponent extends CellDynamicComponent implements OnInit, CellDynamicInterface {

  constructor() {
    super();
  }

  public static pasteData(data: any, column: Column): any {
    if (isNaN(data)) {
      return 0;
    } else {
      return data;
    }
  }

  public static filter(data: any, filterText: any, column: Column): boolean {
    if (filterText) {
      const keywords = this.escapeRegExp(filterText.toString()).split(' ').join('|');
      if (data !== null && data !== undefined) {
        if (keywords.indexOf('\\*') === 0) {
          if (!data.toString().match(new RegExp('(' + keywords.substring(2) + ')', 'gi'))) {
            return false;
          }
        } else {

          if (!data.toString().match(new RegExp('^(' + keywords + ')', 'gi'))) {
            return false;
          }
        }

        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }

  }

  ngOnInit() {
  }


  getDisplayedLabel(): string {
    if (this.column.options.retreiveFunction) {
      return this.column.options.retreiveFunction(this.data);
    } else {
      if (this.column.componentParam['step']) {
        const num: number = (this.data[this.column.data]) ? parseFloat(this.data[this.column.data]) : 0;
        const precision: number = this.column.componentParam['step'];
        if (num !== null) {
          return num.toFixed(precision);
        } else {
          return '0';
        }
      } else {
        return (this.data[this.column.data]) ? this.data[this.column.data] : 0;
      }
    }
  }
}
