import { ItemEvent } from './../models/item-event';
import { Component, OnInit, ViewChild, AfterContentChecked } from '@angular/core';
import { CellDynamicComponent } from '../cell/cell-dynamic-component';
import { CellDynamicInterface } from '../cell/cell-dynamic-interface';
import { Filter } from '../models/filter';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'ds-cell-edit-drop-down',
  templateUrl: './cell-edit-drop-down.component.html',
  styleUrls: ['./cell-edit-drop-down.component.css']
})
export class CellEditDropDownComponent extends CellDynamicComponent implements OnInit, AfterContentChecked, CellDynamicInterface {

  @ViewChild('container', { read: NgSelectComponent, static: true })
  container: NgSelectComponent;

  isOpen = false;

  constructor() {
    super();
  }

  ngOnInit() {
    if (!this.isFilter) {
      this.container.open();
    }
  }

  ngAfterContentChecked() {
  }

  onKeyDown(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 9: // tab

        //this.dataModel = this.container.itemsList.markedItem.value;
        this.key.emit(event);
        break;
      case 27: // esc
      case 37: // left
      case 39: // right
        this.key.emit(event);
        break;
    }
  }

  get dataModel(): any {
    if (this.isFilter) {
      const filters: Array<Filter> = this.data as Array<Filter>;
      const filter = filters.find(f => {
        return f.column === this.column;
      });
      return (filter) ? filter.value : null;
    } else {
      return this.columnData;
    }
  }

  set dataModel(val: any) {
    if (this.isFilter) {
      const filters: Array<Filter> = this.data as Array<Filter>;
      filters.find(filter => {
        return filter.column === this.column;
      }).value = val;
    } else {
      this.columnData = val;
    }
  }

  getPlaceHolder(): string {
    if (this.isFilter) {
      return this.placeHolder;
    } else {
      return this.column.options.placeHolder;
    }
  }

  onChange(event) {
    const ie: ItemEvent = new ItemEvent();
    ie.item = event;
    ie.data = this.data;
    ie.column = this.column;
    ie.row = this.row;

    this.column.itemEvent.emit(ie);
    this.cellChange.emit(this.data);
  }

  onClick(event: MouseEvent) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    this.container.focus();
  }

  onOpen() {
    if (this.column && this.column.options && this.column.options.value) {
      this.container.itemsList.markItem(this.column.options.dataSet[this.columnData]);
    }
  }
}
