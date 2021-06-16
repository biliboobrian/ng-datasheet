import { ItemEvent } from './../models/item-event';
import { CellDynamicInterface } from './../cell/cell-dynamic-interface';
import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CellDynamicComponent } from '../cell/cell-dynamic-component';
import { Filter } from '../models/filter';

@Component({
  selector: 'ds-cell-edit-number',
  templateUrl: './cell-edit-number.component.html',
  styleUrls: ['./cell-edit-number.component.css']
})
export class CellEditNumberComponent extends CellDynamicComponent implements OnInit, AfterViewChecked, CellDynamicInterface {

  @ViewChild('container', { read: ElementRef, static: true })
  container: ElementRef;

  public _model: string;


  public set model(val: number) {
    if (val) {
      if (val !== 0) {
        this._model = val.toString();
      } else {
        this._model = '';
      }
    } else {
      this._model = null;
    }
  }

  public get model(): number {
    if (this._model) {
      if (isNaN(parseFloat(this._model.replace(/,/g, '.')))) {
        return this._model as any;
      } else {
        return parseFloat(this._model.replace(/,/g, '.'));
      }
    } else {
      return this._model as any;
    }
  }

  constructor() {
    super();
  }

  ngOnInit() {
    if (this.column.componentParam['type'] === 'byKey') {
      this._model = null;
    } else {
      if (this.isFilter) {
        const filters: Array<Filter> = this.data as Array<Filter>;
        this._model = filters.find(filter => {
          return filter.column === this.column;
        }).value;
      } else {
        if (this.columnData && this.columnData !== 0) {
          this._model = this.columnData.toString();
        } else {
          this._model = '';
        }
      }
    }
    this.column.componentParam['type'] = '';
  }

  ngAfterViewChecked() {
    if (!this.isFilter) {
      this.container.nativeElement.focus();
      if (this.column.autoOpen
        && this.column.selectOnTab
        && this.column.componentParam['selectOnTab']
        && this.container.nativeElement.value.length > 0
      ) {
        this.container.nativeElement.selectionStart = 0;
        this.column.componentParam['selectOnTab'] = false;
      }
    }
  }

  getStep(): number {
    return 1 / Math.pow(10, this.column.componentParam['step']);
  }

  getPlaceHolder(): string {
    if (this.isFilter) {
      return this.placeHolder;
    } else {
      return this.column.options.placeHolder;
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
        this._model = this.columnData;
        this.key.emit(event);
        break;
      case 9: // tab
      case 13: // enter
      case 38: // up
      case 40: // down
        this.key.emit(event);
        break;
      default:
        /*if (
          (event.keyCode < 48 || event.keyCode > 57)
          && (event.keyCode < 96 || event.keyCode > 105)
          && ([8, 109, 110, 188, 190].indexOf(event.keyCode) === -1)
        ) {
          if ([65, 67, 86].indexOf(event.keyCode) !== -1 && event.ctrlKey) {
          } else {
            event.preventDefault();
            event.stopPropagation();
          }
        }*/
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

  onChange(event: Event) {

    this._model = this._model.toString().replace(/[^0-9.-]/g, '');
    this.columnData = this.model;
    const ie: ItemEvent = new ItemEvent();
    ie.item = this.container.nativeElement.value;
    ie.data = this.data;
    ie.column = this.column;
    ie.row = this.row;

    this.column.itemEvent.emit(ie);
  }
}
