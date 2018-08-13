import { NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CellDynamicComponent } from '../Cell/cell-dynamic-component';
import { CellDynamicInterface } from '../Cell/cell-dynamic-interface';
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
    if (val) {
      this.data[this.column.data] = moment(new Date(val.year, val.month - 1, val.day));
    } else {
      this.data[this.column.data] = null;
    }

  }

  public get dateModel(): NgbDateStruct {
    return this._dateModel;
  }

  ngOnInit() {
    const d: moment_.Moment = this.data[this.column.data];
    if (d) {
      this._dateModel = {
        year: parseInt(d.format('YYYY'), 10),
        month: parseInt(d.format('MM'), 10),
        day: parseInt(d.format('DD'), 10)
      };
    } else {
      this._dateModel = null;
    }
    this.container.nativeElement.focus();
  }

  onKeyDown(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 9: // tab
      case 13: // enter
      case 27: // esc
      case 37: // left
      case 38: // up
      case 39: // right
      case 40: // down
        this.container.nativeElement.blur();
        this.key.emit(event);
        break;
      case 32: // space
        this.d.toggle();
        break;
    }
  }

  onDateSelect(event) {
    this.container.nativeElement.focus();
  }
}
