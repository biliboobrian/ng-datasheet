import { ItemEvent } from './../models/item-event';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked
} from '@angular/core';
import { CellDynamicComponent } from '../cell/cell-dynamic-component';
import { CellDynamicInterface } from '../cell/cell-dynamic-interface';
import { Filter } from '../models/filter';

@Component({
  selector: 'ds-cell-edit-basic',
  templateUrl: './cell-edit-basic.component.html',
  styleUrls: ['./cell-edit-basic.component.css']
})
export class CellEditBasicComponent extends CellDynamicComponent
  implements OnInit, AfterViewChecked, CellDynamicInterface {
  @ViewChild('container', { read: ElementRef })
  container: ElementRef;

  public model = '';

  constructor() {
    super();
  }

  ngOnInit() {
    if (this.column.componentParam['type'] === 'byKey') {
      this.model = '';
    } else {
      if (this.isFilter) {
        const filters: Array<Filter> = this.data as Array<Filter>;
        const f = filters.find(filter => {
          return filter.column === this.column;
        });

        if (f) {
          this.model = f.value;
        }
      } else {
        this.model = this.columnData;
      }
    }

    this.column.componentParam['type'] = '';
  }

  ngAfterViewChecked() {
    if (!this.isFilter) {
      this.container.nativeElement.focus();
      if (
        this.column.autoOpen &&
        this.column.selectOnTab &&
        this.column.componentParam['selectOnTab'] &&
        this.container.nativeElement.value.length > 0
      ) {
        this.container.nativeElement.selectionStart = 0;
        this.container.nativeElement.selectionEnd = this.columnData.length;
        this.column.componentParam['selectOnTab'] = false;
      }
    }
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
        this.model = this.columnData;
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

  onKeyUp(event: KeyboardEvent): void {
    if (this.isFilter) {
      const filters: Array<Filter> = this.data as Array<Filter>;
      filters.find(filter => {
        return filter.column === this.column;
      }).value = this.model;
    }

    this.cellChange.emit(this.data);
  }

  onBlur(event: FocusEvent): void {
    if (this.isFilter) {
      const filters: Array<Filter> = this.data as Array<Filter>;
      filters.find(filter => {
        return filter.column === this.column;
      }).value = this.model;
    } else {
      this.columnData = this.model;
    }
    this.blurinput.emit(event);
  }

  onChange(event) {
    this.columnData = this.model;
    const ie: ItemEvent = new ItemEvent();
    ie.item = this.container.nativeElement.value;
    ie.data = this.data;
    ie.column = this.column;
    ie.row = this.row;

    this.column.itemEvent.emit(ie);
  }

  getPlaceHolder(): string {
    if (this.isFilter) {
      return this.placeHolder;
    } else {
      return this.column.options.placeHolder;
    }
  }
}
