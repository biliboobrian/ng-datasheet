export class Coordinate {
    row: number;
    col: number;

    empty() {
        this.row = null;
        this.col = null;
    }

    isEmpty(): boolean {
        if(this.row == null && this.col == null) {
            return true;
        } else {
            return false;
        }
    }

    setCoord(row: number, col: number) {
        this.row = row;
        this.col = col;
    }
}
