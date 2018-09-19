import { Pagination } from './pagination';
import { Filter } from './filter';
import { Sort } from './sort';

export class RenderEvent {
    pagination: Pagination;
    filters: Array<Filter>;
    sort: Sort;
    filterList: Array<number>;

    constructor(pagination: Pagination, filters: Array<Filter>, sort: Sort, filterList: Array<number>) {
        this.pagination = pagination;
        this.filters = filters;
        this.sort = sort;
        this.filterList = filterList;
    }
}
