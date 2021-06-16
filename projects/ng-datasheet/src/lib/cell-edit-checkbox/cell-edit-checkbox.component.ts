import { ItemEvent } from './../models/item-event';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CellDynamicComponent } from '../cell/cell-dynamic-component';
import { CellDynamicInterface } from '../cell/cell-dynamic-interface';
import { Filter } from '../models/filter';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'ds-cell-edit-checkbox',
  templateUrl: './cell-edit-checkbox.component.html',
  styleUrls: ['./cell-edit-checkbox.component.css']
})
export class CellEditCheckboxComponent extends CellDynamicComponent implements OnInit, AfterViewInit, CellDynamicInterface {

  @ViewChild('containerCheckBox', { read: ElementRef, static: false }) containerCheckBox: ElementRef;
  @ViewChild('containerSelect', { read: NgSelectComponent, static: true }) containerSelect: NgSelectComponent;

  items: Array<object> = [
    {
      label: 'No',
      value: false
    },
    {
      label: 'Yes',
      value: true
    },

  ];

  constructor() {
    super();
  }

  get dataModel(): boolean {
    if (this.isFilter) {
      const filters: Array<Filter> = this.data as Array<Filter>;
      return filters.find(filter => {
        return filter.column === this.column;
      }).value;
    } else {
      return this.columnData;
    }
  }

  set dataModel(val: boolean) {
    if (this.isFilter) {
      const filters: Array<Filter> = this.data as Array<Filter>;
      filters.find(filter => {
        return filter.column === this.column;
      }).value = val;
    } else {
      this.columnData = val;
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    this.key.emit(event);
  }

  ngOnInit() {

  }

  onClick(event: MouseEvent) {

    this.dataModel = !this.dataModel;
    if (!this.isFilter) {
      this.containerCheckBox.nativeElement.focus();

      if (event.target !== this.containerCheckBox.nativeElement) {
        this.onChange(event);
      }
    }
  }

  ngAfterViewInit() {
    if (!this.isFilter) {
      this.containerCheckBox.nativeElement.focus();
    }
  }

  onBlur(event: FocusEvent): void {
    // this.blurinput.emit(event);
  }

  onChange(event: Event): void {
    // event.target['blur']();

    if (!this.isFilter) {
      const ie: ItemEvent = new ItemEvent();
      ie.item = this.containerCheckBox.nativeElement.checked;
      ie.data = this.data;
      ie.column = this.column;
      ie.row = this.row;
      this.column.itemEvent.emit(ie);
    }

    this.cellChange.emit(this.data);
  }

  getPlaceHolder(): string {
    if (this.isFilter) {
      return this.placeHolder;
    } else {
      return this.column.options.placeHolder;
    }
  }

}
