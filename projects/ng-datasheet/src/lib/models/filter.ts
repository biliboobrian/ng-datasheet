import { Column } from './column';

export class Filter {

    column: Column;
    value: string;
    useLike: Boolean = true;

    constructor(column: Column) {
        this.column = column;
    }
}
