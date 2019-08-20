export class Pagination {
    perPage: number;
    total: number;
    currentPage: number;

    constructor(total: number, perPage: number, currentPage: number) {
        this.perPage = perPage;
        this.total = total;
        this.currentPage = currentPage;
    }

    get previousPage(): number {
        if (this.currentPage > 0) {
            return this.currentPage - 1;
        } else {
            return 0;
        }
    }

    get nextPage(): number {
        if (this.currentPage < this.lastPage) {
            return this.currentPage + 1;
        } else {
            return this.lastPage;
        }
    }

    get lastPage(): number {
        if (this.total % this.perPage === 0) {
            return this.total / this.perPage - 1;
        } else {
            return Math.trunc(this.total / this.perPage);
        }

    }

    get pages(): Array<number> {
        let p: Array<number> = [];

        if (this.lastPage < 8) {
            for (let index = 0; index <= this.lastPage; index++) {
                p.push(index);
            }
        } else {
            if (this.currentPage < 4) {
                p = [0, 1, 2, 3, 4, 5, -1];
            } else if (this.currentPage < this.lastPage - 3) {
                p = [
                    -1,
                    this.currentPage - 2,
                    this.currentPage - 1,
                    this.currentPage,
                    this.currentPage + 1,
                    this.currentPage + 2,
                    -1
                ];
            } else {
                p = [-1,
                this.lastPage - 5,
                this.lastPage - 4,
                this.lastPage - 3,
                this.lastPage - 2,
                this.lastPage - 1,
                this.lastPage
                ];
            }
        }

        return p;
    }

}
