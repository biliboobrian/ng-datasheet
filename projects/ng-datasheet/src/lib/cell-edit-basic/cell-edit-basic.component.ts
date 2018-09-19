import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CellDynamicComponent } from '../Cell/cell-dynamic-component';
import { CellDynamicInterface } from '../Cell/cell-dynamic-interface';

@Component({
  selector: 'ds-cell-edit-basic',
  templateUrl: './cell-edit-basic.component.html',
  styleUrls: ['./cell-edit-basic.component.css']
})
export class CellEditBasicComponent extends CellDynamicComponent implements OnInit, CellDynamicInterface {

  @ViewChild('container', { read: ElementRef })
  container: ElementRef;

  public _model = '';

  public set model(val: string) {
    this._model = val;
  }

  public get model(): string {
    return this._model;
  }

  constructor() {
    super();
  }

  ngOnInit() {
    this.container.nativeElement.focus();
    if (this.column.componentParam === 'byKey') {
      this._model = '';
    } else {
      this._model = this.data[this.column.data];
    }
    this.column.componentParam = '';
  }

  onKeyDown(event: KeyboardEvent): void {
    let input: HTMLInputElement;
    switch (event.keyCode) {
      case 37: // left
        input = event.currentTarget as HTMLInputElement;
        if (input.selectionStart === 0) {
          this.key.emit(event);
        }
        break;
      case 39: // right
        input = event.currentTarget as HTMLInputElement;
        if (input.selectionStart === input.value.length) {
          this.key.emit(event);
        }
        break;
      case 27: // esc
        this._model = this.data[this.column.data];
        this.key.emit(event);
        break;
      case 9: // tab
      case 13: // enter
      case 38: // up
      case 40: // down
        this.key.emit(event);
        break;
    }
  }

  onBlur(event: FocusEvent): void {
    this.data[this.column.data] = this._model;
    this.blurinput.emit(event);
  }
}
