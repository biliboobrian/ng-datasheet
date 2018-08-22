export class Pagination {
    perPage: number;
    total: number;
    currentPage: number;

    constructor(total:number, perPage:number, currentPage: number) {
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
        return Math.trunc(this.total / this.perPage);
    }

    get pages(): Array<number> {
        const p: Array<number> = [];

        for (let index = 0; index <= this.lastPage; index++) {
            p.push(index);
        }

        return p;
    }

}
