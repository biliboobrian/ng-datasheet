import { Column } from '../models/column';
import { EventEmitter, Output, Input } from '@angular/core';


export abstract class CellDynamicComponent {

    protected _column: Column = new Column();
    protected _data: Object = {};
    protected _row = 0;
    public autoOpen = false;
    
    @Input() isFilter = false;

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

    public static pasteData(data: string, column: Column): any {
        return data;
    }
}
