import { Column } from './../models/column';
import { Component, OnInit } from '@angular/core';
import { CellDynamicComponent } from '../cell/cell-dynamic-component';
import { CellDynamicInterface } from '../cell/cell-dynamic-interface';
import * as moment_ from 'moment'; const moment = moment_;


@Component({
  selector: 'ds-cell-view-date',
  templateUrl: './cell-view-date.component.html',
  styleUrls: ['./cell-view-date.component.css']
})
export class CellViewDateComponent extends CellDynamicComponent implements OnInit, CellDynamicInterface {

  formattedDate: string;

  constructor() {
    super();
  }

  public static copyData(data: any, column: Column): string {
    const d: moment_.Moment = data;
    if (d) {
      return d.format(column.options.format);
    } else {
      return '';
    }
  }


  public static pasteData(data: string, column: Column): any {
    const myMoment: moment_.Moment = moment(data, column.options.format);
    if (myMoment.isValid()) {
      return myMoment;
    } else {
      return null;
    }
  }

  ngOnInit() {

  }

  formatText(date: moment_.Moment): string {
    if (date && this.column.options && this.column.options.format) {
      return date.format(this.column.options.format);
    }
    return '';
  }

  getDisplayedLabel(): string {
    return this.formatText(this.data[this.column.data]);
  }
}
