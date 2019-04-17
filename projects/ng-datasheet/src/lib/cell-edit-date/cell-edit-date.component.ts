import { ItemEvent } from './../models/item-event';
import { NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CellDynamicComponent } from '../cell/cell-dynamic-component';
import { CellDynamicInterface } from '../cell/cell-dynamic-interface';
import { Filter } from '../models/filter';
import * as moment_ from 'moment'; const moment = moment_;


// @dynamic
@Component({
  selector: 'ds-cell-edit-date',
  templateUrl: './cell-edit-date.component.html',
  styleUrls: ['./cell-edit-date.component.css']
})
export class CellEditDateComponent extends CellDynamicComponent implements OnInit, CellDynamicInterface {

  _dateModel: NgbDateStruct;

  @ViewChild('container', { read: ElementRef })
  container: ElementRef;

  @ViewChild('d', { read: NgbInputDatepicker })
  d: NgbInputDatepicker;

  constructor() {
    super();
  }

  public set dateModel(val: NgbDateStruct) {
    this._dateModel = val;
    if (this.isFilter) {
      const filters: Array<Filter> = this.data as Array<Filter>;
      const f = filters.find(filter => {
        return filter.column === this.column;
      });

      if (val) {
        f.value = moment(new Date(val.year, val.month - 1, val.day));
      } else {
        f.value = null;
      }
    } else {
      if (val) {
        this.columnData = moment(new Date(val.year, val.month - 1, val.day));
      } else {
        this.columnData = null;
      }
    }

    this.cellChange.emit(this.data);
  }

  public get dateModel(): NgbDateStruct {
    return this._dateModel;
  }

  ngOnInit() {
    let d: moment_.Moment;
    if (this.isFilter) {
      const filters: Array<Filter> = this.data as Array<Filter>;
      d = filters.find(filter => {
        return filter.column === this.column;
      }).value;
    } else {
      d = this.columnData;
    }

    if (d) {
      this._dateModel = {
        year: parseInt(d.format('YYYY'), 10),
        month: parseInt(d.format('MM'), 10),
        day: parseInt(d.format('DD'), 10)
      };
    } else {
      this._dateModel = null;
    }

    if (!this.isFilter) {
      this.container.nativeElement.focus();
      this.d.toggle();
    }
  }

  onKeyDown(event: KeyboardEvent) {
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
      case 13: // enter
      case 27: // esc
      case 38: // up
      case 40: // down
        // this.container.nativeElement.blur();
        this.key.emit(event);
        break;
      case 32: // space
        this.d.toggle();
        break;
    }
  }

  onDateSelect(event) {
    this.columnData = moment(new Date(event.year, event.month - 1, event.day));
    const ie: ItemEvent = new ItemEvent();
    ie.item = event;
    ie.data = this.data;
    ie.column = this.column;
    ie.row = this.row;

    this.column.itemEvent.emit(ie);
    this.container.nativeElement.focus();
  }

  onChange(event: Event) {
    const ie: ItemEvent = new ItemEvent();
    ie.item = this.container.nativeElement.value;
    ie.data = this.data;
    ie.column = this.column;
    ie.row = this.row;

    this.column.itemEvent.emit(ie);
  }

  onBlur(event: FocusEvent): void {
    this.blurinput.emit(event);
  }

  getPlaceHolder(): string {
    if (this.isFilter) {
      return this.placeHolder;
    } else {
      return this.column.options.format;
    }
  }
}
