import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CellDynamicComponent } from '../cell/cell-dynamic-component';
import { CellDynamicInterface } from '../cell/cell-dynamic-interface';

@Component({
  selector: 'ds-cell-edit-checkbox',
  templateUrl: './cell-edit-checkbox.component.html',
  styleUrls: ['./cell-edit-checkbox.component.css']
})
export class CellEditCheckboxComponent extends CellDynamicComponent implements OnInit, CellDynamicInterface {

  @ViewChild('container', { read: ElementRef })
  container: ElementRef;

  constructor() {
    super();
  }

  onKeyDown(event: KeyboardEvent): void {
    this.key.emit(event);
  }

  ngOnInit() {
    this.container.nativeElement.focus();
  }

  onBlur(event: FocusEvent): void {
    this.blurinput.emit(event);
  }

}