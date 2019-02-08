import { Component, OnInit } from '@angular/core';
import { CellDynamicComponent } from '../cell/cell-dynamic-component';
import { CellDynamicInterface } from '../cell/cell-dynamic-interface';

@Component({
  selector: 'ds-cell-view-basic',
  templateUrl: './cell-view-basic.component.html',
  styleUrls: ['./cell-view-basic.component.css']
})
export class CellViewBasicComponent extends CellDynamicComponent implements OnInit, CellDynamicInterface {

  constructor() {
    super();
  }

  ngOnInit() {
  }

  getDisplayedLabel(): string {
    if (this.column.options.retreiveFunction) {
      return this.column.options.retreiveFunction(this.data);
    } else {
      const properties = this.column.data.split('.');
      return this.getLastData(this.data, properties);
    }
  }
}
