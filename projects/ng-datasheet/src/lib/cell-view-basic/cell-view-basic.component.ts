import { Component, OnInit } from '@angular/core';
import { CellDynamicComponent } from '../cell/cell-dynamic-component';
import { CellDynamicInterface } from '../cell/cell-dynamic-interface';
import { Column } from '../models/column';

@Component({
  selector: 'ds-cell-view-basic',
  templateUrl: './cell-view-basic.component.html',
  styleUrls: ['./cell-view-basic.component.css']
})
export class CellViewBasicComponent extends CellDynamicComponent implements OnInit, CellDynamicInterface {

  constructor() {
    super();
  }

  public static filter(data: any, filterText: any, column: Column): boolean {
    if (filterText) {
      const keywords = this.escapeRegExp(filterText).split(' ').join('|');
      if (data !== null && data !== undefined) {
        if (keywords.indexOf('\\*') === 0) {
          if (!data.toString().match(new RegExp('(' + keywords.substring(2) + ')', 'gi'))) {
            return false;
          }
        } else {
          if (column.searchContains) {
            if (!data.toString().match(new RegExp('(' + keywords + ')', 'gi'))) {
              return false;
            }
          } else {
            if (!data.toString().match(new RegExp('^(' + keywords + ')', 'gi'))) {
              return false;
            }
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
    if (this.column.options.retrieveFunction) {
      return this.column.options.retrieveFunction(this.data);
    } else {
      return this.columnData;
    }
  }
}
