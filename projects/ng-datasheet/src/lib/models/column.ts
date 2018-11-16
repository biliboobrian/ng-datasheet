import { ItemEvent } from './item-event';
import { EventEmitter } from '@angular/core';
import { CellDynamicInterface } from '../cell/cell-dynamic-interface';
import { Options } from './options';

export class Column {
    title: string; // title of the TH header
    data: string; // field in the model representing data to give to the component
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
    cellView: CellDynamicInterface;
    cellEdit: CellDynamicInterface;
    itemEvent: EventEmitter<ItemEvent> = new EventEmitter<ItemEvent>();

    type = 'string';
    componentParam: Object = {};
}
