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
      const keywords = filterText.split(' ').join('|');
      if (data !== null) {
        if (keywords.indexOf('*') === 0) {
          if (!data.toString().match(new RegExp('(' + keywords.substring(1) + ')', 'gi'))) {
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
      return this.data[this.column.data];
    }
  }
}
