import { Coordinate } from './coordinate';

export class CellEvent {

    main: Coordinate;
    start: Coordinate;
    end: Coordinate;
    edited: Coordinate;

    constructor(main: Coordinate, start: Coordinate, end: Coordinate, edited: Coordinate) {
        this.main = main;
        this.start = start;
        this.end = end;
        this.edited = edited;
    }
}
