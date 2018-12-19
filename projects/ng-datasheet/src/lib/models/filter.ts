import { Column } from './column';

export class Filter {

    column: Column;
    value = '';
    useLike: Boolean = true;

    constructor(column: Column) {
        this.column = column;
    }
}
