import { Pagination } from "./pagination";
import { Filter } from "./filter";
import { Sort } from "./sort";

export class RenderEvent {
    pagination: Pagination;
    filters: Array<Filter>;
    sort: Sort;

    constructor(pagination: Pagination, filters: Array<Filter>, sort: Sort) {
        this.pagination = pagination;
        this.filters = filters;
        this.sort = sort;
    }
}
