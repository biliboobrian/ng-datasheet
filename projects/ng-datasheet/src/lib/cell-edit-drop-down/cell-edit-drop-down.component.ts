import { ItemEvent } from './../models/item-event';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CellDynamicComponent } from '../cell/cell-dynamic-component';
import { CellDynamicInterface } from '../cell/cell-dynamic-interface';
import { Filter } from '../models/filter';

@Component({
  selector: 'ds-cell-edit-drop-down',
  templateUrl: './cell-edit-drop-down.component.html',
  styleUrls: ['./cell-edit-drop-down.component.css']
})
export class CellEditDropDownComponent extends CellDynamicComponent implements OnInit, CellDynamicInterface {

  public open = true;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  onKeyDown(event: KeyboardEvent) {
    let index;
    switch (event.keyCode) {
      case 9: // tab
      case 13: // enter
      case 27: // esc
      case 37: // left
      case 39: // right
        this.key.emit(event);
        break;
    }
  }

  onSelect(option: Object): void {
    // this.dataModel = option;
    this.open = false;

    const ie: ItemEvent = new ItemEvent();
    ie.item = option;
    ie.data = this.data;
    ie.column = this.column;
    ie.row = this.row;

    this.column.itemEvent.emit(ie);
  }

  onToggle(event: MouseEvent): void {
    this.open = !this.open;
  }

  isSelected(option: Object): boolean {
    return option === this.dataModel;
  }

  get dataModel(): string {
    if (this.isFilter) {
      const filters: Array<Filter> = this.data as Array<Filter>;
      return filters.find(filter => {
        return filter.column === this.column;
      }).value;
    } else {
      if (this.column.type && this.column.type === 'string') {
        return this.data[this.column.data];
      } else {
        return this.column.options.dataSet.find(element => {
          return element[this.column.options.value] === this.data[this.column.data];
        })[this.column.options.value];
      }
    }
  }

  set dataModel(val: string) {
    if (this.isFilter) {
      const filters: Array<Filter> = this.data as Array<Filter>;
      filters.find(filter => {
        return filter.column === this.column;
      }).value = val;
    } else {
      if (this.column.type && this.column.type === 'string') {
        this.data[this.column.data] = val;
      } else {
        this.data[this.column.data] = this.column.options.dataSet.find(element => {
          return element[this.column.options.value] === val;
        });
      }
    }
  }

  getPlaceHolder(): string {
    if (this.isFilter) {
      return this.placeHolder;
    } else {
      return this.column.options.placeHolder;
    }
  }

  getDisplayedLabel(): string {
    if (this.column.type && this.column.type === 'string') {
      const elem: Object = this.column.options.dataSet.find(element => {
        return element[this.column.options.value] === this.data[this.column.data];
      });

      if (elem) {
        return elem[this.column.options.label];
      } else {
        return '';
      }
    } else {
      return this.data[this.column.data][this.column.options.label];
    }
  }

  getLabel(val: object) {
    return val[this.column.options.label];
  }

  onChange(event) {
    this.cellChange.emit(this.data);
  }
}
