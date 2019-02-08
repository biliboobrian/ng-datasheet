import { Column } from '../models/column';
import { EventEmitter, Output } from '@angular/core';


export abstract class CellDynamicComponent {

    protected _column: Column = new Column();
    protected _data: Object = {};
    protected _row = 0;
    public autoOpen = false;

    @Output() key: EventEmitter<KeyboardEvent> = new EventEmitter();
    @Output() blurinput: EventEmitter<FocusEvent> = new EventEmitter();

    get data(): Object {
        return this._data;
    }

    set data(val: Object) {
        this._data = val;
    }

    get column(): Column {
        return this._column;
    }

    set column(val: Column) {
        this._column = val;
    }

    get row(): number {
        return this._row;
    }

    set row(val: number) {
        this._row = val;
    }
    public static copyData(data: any, column: Column): string {
        if (data) {
            return data.toString();
        } else {
            return '';
        }

    }

    getLastData(obj: Object, properties: Array<string>): any {
      const property: string = properties.shift();

      if (properties.length === 0) {
        return (obj[property]) ? obj[property] : null;
      } else {
        return (obj[property]) ? this.getLastData(obj[property], properties) : null;
      }
    }


    public static pasteData(data: string, column: Column): any {
        return data;
    }
}
