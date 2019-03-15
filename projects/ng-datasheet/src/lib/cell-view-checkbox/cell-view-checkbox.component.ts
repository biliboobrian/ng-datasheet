import { Column } from './../models/column';
import { Component, OnInit } from '@angular/core';
import { CellDynamicComponent } from '../cell/cell-dynamic-component';
import { CellDynamicInterface } from '../cell/cell-dynamic-interface';

@Component({
  selector: 'ds-cell-view-checkbox',
  templateUrl: './cell-view-checkbox.component.html',
  styleUrls: ['./cell-view-checkbox.component.css']
})
export class CellViewCheckboxComponent extends CellDynamicComponent implements OnInit, CellDynamicInterface {

  public static filter(data: any, filterText: any, column: Column): boolean {
    if (filterText !== null) {
        if (data === filterText) {
            return true;
        } else {
            return false;
        }
    }
    return true;
}

public static copyData(data: any, column: Column): string {
    if (data) {
      return '1';
    } else {
      return '0';
    }
  }


  public static pasteData(data: any, column: Column): any {
    if (data === '1') {
      return true;
    } else if (data === '0') {
      return false;
    }
    return null;
  }

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
