import { ItemEvent } from './item-event';
import { EventEmitter } from '@angular/core';
import { CellDynamicInterface } from '../cell/cell-dynamic-interface';
import { Options } from './options';

export class Column {

    title: string; // title of the TH header
    data: string | Array<string>; // field in the model representing data to give to the component
    width = 0; // expected fix width for this column, by default it will affect for the width > width_of_table / number_of_column
    noWidth = false; // set the column as a extensible colmun !!! YOU NEED AT LEAST ONE !!!
    options: Options = new Options(); // options gives to the view/edit component acording to his requirements
    neededForAdd = true; // display or not on the extended row at the end of table if table allow to add row
    searchable = true;
    selectable = true;
    sortable = true;
    editable = true;
    isResizing = false;
    autoOpen = false;
    backgroundColor: string;
    cellView: CellDynamicInterface;
    cellEdit: CellDynamicInterface;
    itemEvent: EventEmitter<ItemEvent> = new EventEmitter<ItemEvent>();
    componentParam: Object = {};

    constructor(
        title?: string,
        data?: string | Array<string>,
        cellView?: CellDynamicInterface,
        cellEdit?: CellDynamicInterface,
        width?: number
    ) {
        this.title = title;
        this.data = data;
        this.cellView = cellView;
        this.cellEdit = cellEdit;

        if (width && width !== 0) {
            this.width = width;
        } else {
            this.noWidth = true;
        }
    }

    getColumnData(data: any): any {
        if (data) {
            if (typeof this.data === 'string') {
                return data[this.data];
            } else {
                return this.getLastData(data, this.data);
            }
        }

        return null;
    }

    setColumnData(data: any, val: any) {
        if (data) {
            if (typeof this.data === 'string') {
                data[this.data] = val;
            } else {
                this.setLastData(data, this.data, val);
            }
        }
    }

    getLastData(data: object, columns: Array<string>): any {
        const column = columns[0];

        if (data && data[column] !== undefined) {
            if (columns.length > 1) {
                return this.getLastData(data[column], columns.slice(1));
            } else {
                return data[column];
            }
        }

        return null;
    }

    setLastData(data: object, columns: Array<string>, val: any) {
        const column = columns[0];

        if (data) {
            if (columns.length > 1) {
                if (data[column] !== undefined) {
                    this.setLastData(data[column], columns.slice(1), val);
                }
            } else {
                data[column] = val;
            }
        }
    }
}
