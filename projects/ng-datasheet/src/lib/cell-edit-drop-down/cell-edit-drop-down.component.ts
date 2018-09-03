import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CellDynamicComponent } from '../Cell/cell-dynamic-component';
import { CellDynamicInterface } from '../Cell/cell-dynamic-interface';

@Component({
  selector: 'ds-cell-edit-drop-down',
  templateUrl: './cell-edit-drop-down.component.html',
  styleUrls: ['./cell-edit-drop-down.component.css']
})
export class CellEditDropDownComponent extends CellDynamicComponent implements OnInit, CellDynamicInterface {

  @ViewChild('container', { read: ElementRef })
  container: ElementRef;

  constructor() {
    super();
  }

  ngOnInit() {
    this.container.nativeElement.focus();
  }

  onKeyDown(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 9: // tab
      case 13: // enter
      case 27: // esc
      case 37: // left
      case 39: // right
        this.container.nativeElement.blur();
        this.key.emit(event);
        break;
    }
  }

  get dataModel(): Object {
    if (this.column.options.format && this.column.options.format === 'string') {
      return this.column.options.dataSet.find(element => {
        return element[this.column.options.value] === this.data[this.column.data];
      });
    } else {
      return this.data[this.column.data];
    }
  }

  set dataModel(val: Object) {
    if (this.column.options.format && this.column.options.format === 'string') {
      this.data[this.column.data] = val[this.column.options.value];
    } else {
      this.data[this.column.data] = val;
    }
  }
}
