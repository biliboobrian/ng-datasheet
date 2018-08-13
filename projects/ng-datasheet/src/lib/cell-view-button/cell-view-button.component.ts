import { Component, OnInit } from '@angular/core';
import { CellDynamicComponent } from '../Cell/cell-dynamic-component';
import { CellDynamicInterface } from '../Cell/cell-dynamic-interface';

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
}
