
export class RowEvent {

    data: object;
    row: number;

    constructor(data: object, row: number) {
        this.data = data;
        this.row = row;
    }
}
