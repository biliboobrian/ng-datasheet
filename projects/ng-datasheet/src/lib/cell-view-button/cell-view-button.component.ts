import { Component, OnInit } from '@angular/core';
import { CellDynamicComponent } from '../cell/cell-dynamic-component';
import { CellDynamicInterface } from '../cell/cell-dynamic-interface';

@Component({
  selector: 'ds-cell-view-button',
  templateUrl: './cell-view-button.component.html',
  styleUrls: ['./cell-view-button.component.css']
})
export class CellViewButtonComponent extends CellDynamicComponent implements OnInit, CellDynamicInterface {

  constructor() {
    super();
  }

  ngOnInit() {

  }

  getBgColor(button: Object): string {
    if (button['bgColor']) {
      return button['bgColor'];
    } else {
      return null;
    }
  }

  getColor(button: Object): string {
    if (button['color']) {
      return button['color'];
    } else {
      return '#000000';
    }
  }

  getBorderColor(button: Object): string {
    if (button['borderColor']) {
      return button['borderColor'];
    } else {
      return '#000000';
    }
  }
}
