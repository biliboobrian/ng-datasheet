import { Component, OnInit } from '@angular/core';
import { CellDynamicComponent } from '../cell/cell-dynamic-component';
import { CellDynamicInterface } from '../cell/cell-dynamic-interface';

@Component({
  selector: 'ds-cell-view-number',
  templateUrl: './cell-view-number.component.html',
  styleUrls: ['./cell-view-number.component.css']
})
export class CellViewNumberComponent extends CellDynamicComponent implements OnInit, CellDynamicInterface {

  constructor() {
    super();
  }

  ngOnInit() {
  }

  getDisplayedLabel(): string {
    if (this.column.componentParam['step']
    ) {
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
