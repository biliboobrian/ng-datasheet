import { Component, OnInit } from '@angular/core';
import { CellDynamicComponent } from '../Cell/cell-dynamic-component';
import { CellDynamicInterface } from '../Cell/cell-dynamic-interface';

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
      return this.data[this.column.data];
    }
  }
}
