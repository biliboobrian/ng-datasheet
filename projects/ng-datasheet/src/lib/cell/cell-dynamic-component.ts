import { Column } from '../models/column';
import { EventEmitter, Output, Input } from '@angular/core';
import { DataService } from '../services/data.service';


export abstract class CellDynamicComponent {

    protected _dataService: DataService = new DataService();
    protected _column: Column = new Column();
    protected _data: Object = {};
    protected _row = 0;
    public autoOpen = false;
    public placeHolder = '';
    public selectOnTab = false;

    @Input() isFilter = false;
    @Input() dgEditable = false;

    @Output() key: EventEmitter<KeyboardEvent> = new EventEmitter();
    @Output() blurinput: EventEmitter<FocusEvent> = new EventEmitter();
    @Output() cellChange: EventEmitter<object> = new EventEmitter();

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

    get columnData(): any {
        if (this.column && this.data) {
            return this.column.getColumnData(this.data);
        }
        return null;
    }

    set columnData(val: any) {
        if (this.column && this.data) {
            this.column.setColumnData(this.data, val);
        }
    }


    public static filter(data: any, filterText: any, column: Column): boolean {
        if (filterText) {
            if (data === filterText) {
                return true;
            } else {
                return false;
            }
        }
        return true;
    }

    public static copyData(data: any, column: Column): string {
        if (data) {
            return data.toString();
        } else {
            return '';
        }

    }

    public static pasteData(data: any, column: Column): any {
        return data;
    }

    public static escapeRegExp(text): string {
        if (isNaN(text)) {
            const regexp = new RegExp('\[\\-\\[\\]\\{\\}\\(\\)\\*\\+\\?\\.\\,\\\\\/\\^\\$\\|\\#\]', 'g');
            return text.replace(regexp, '\\$&');
        } else {
            return text.toString();
        }

    }
}
