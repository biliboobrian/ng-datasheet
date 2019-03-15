import { Column } from './column';

export class Filter {

    column: Column;
    value: any;
    useLike: Boolean = true;

    constructor(column: Column) {
        this.column = column;
    }
}
