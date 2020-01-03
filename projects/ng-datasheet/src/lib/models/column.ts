import { ItemEvent } from './item-event';
import { EventEmitter } from '@angular/core';
import { CellDynamicInterface } from '../cell/cell-dynamic-interface';
import { Options } from './options';
import { ColumnValidator } from './column-validator';
import { FormControl } from '@angular/forms';
import { ColumnType } from './column-type';

export class Column {

    _formControl: FormControl;

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
    selectOnTab = false;
    searchContains = false;
    backgroundColor: string;
    columnValidators: Array<ColumnValidator>;
    cellView: CellDynamicInterface;
    cellEdit: CellDynamicInterface;
    itemEvent: EventEmitter<ItemEvent> = new EventEmitter<ItemEvent>();
    cellClassFunction: Function;
    cellEditableFunction: Function;
    componentParam: Object = {};
    type: string = 'string';

    constructor(
        title?: string,
        data?: string | Array<string>,
        cellView?: CellDynamicInterface,
        cellEdit?: CellDynamicInterface,
        width?: number,
        editable = true,
        sortable = true,
        selectable = true,
    ) {
        this.title = title;
        this.data = data;
        this.cellView = cellView;
        this.cellEdit = cellEdit;
        this.editable = editable;
        this.sortable = sortable;
        this.selectable = selectable;

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

    isValid(data: object, row: number): boolean {
        let valid = true;
        if (this.columnValidators) {


            this.columnValidators.forEach(columnValidator => {
                if (columnValidator.validator) {
                    if (!this._formControl) {
                        this._formControl = new FormControl('');
                    }
                    this._formControl.setValue(this.getColumnData(data));


                    if (columnValidator.validator(this._formControl)) {
                        valid = false;
                    }
                } else {
                    if (columnValidator.validationFn(this, data, row)) {
                        valid = false;
                    }
                }

            });
        }

        return valid;
    }

    isEditable(row: number): boolean {
        if (this.cellEditableFunction) {
            return this.cellEditableFunction(this, row);
        } else {
            return this.editable;
        }
    }

    getValidationErrors(data: object, row: number): string {
        let errors = '';
        if (this.columnValidators) {

            if (!this._formControl) {
                this._formControl = new FormControl('');
            }

            this._formControl.setValue(this.getColumnData(data));

            this.columnValidators.forEach(columnValidator => {
                if (columnValidator.validator) {
                    if (columnValidator.validator(this._formControl)) {
                        errors += columnValidator.errorMessage + ' ';
                    }
                } else {
                    if (columnValidator.validationFn(this, data, row)) {
                        errors += columnValidator.errorMessage + ' ';
                    }
                }
            });
        }

        return errors;
    }
}
