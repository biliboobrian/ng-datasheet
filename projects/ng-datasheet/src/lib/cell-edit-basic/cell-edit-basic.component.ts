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

  constructor() {
    super();
  }

  ngOnInit() {
    this.container.nativeElement.focus();
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

      case 9: // tab
      case 27: // esc
      case 13: // enter
      case 38: // up
      case 40: // down
        this.key.emit(event);
        break;
    }
  }

}
