import { Injectable } from '@angular/core';
import { Column } from '../models/column';
import { Sort } from '../models/sort';
import { Filter } from '../models/filter';
import { Pagination } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  sortDataSet(dataSet: Array<Object>, sort: Sort): void {
    dataSet.sort((a, b) => {
      if (sort) {
        if (!a[sort.column.data]
          || !this.copyType(a[sort.column.data], sort.column)
          || this.copyType(a[sort.column.data], sort.column) === '') {
          return 1;
        }

        if (!b[sort.column.data]
          || !this.copyType(b[sort.column.data], sort.column)
          || this.copyType(b[sort.column.data], sort.column) === '') {
          return -1;
        }
        if (sort.type === 'string') {
          if (this.copyType(a[sort.column.data], sort.column).toLowerCase()
            < this.copyType(b[sort.column.data], sort.column).toLowerCase()) {
            return (sort.asc) ? -1 : 1;
          }

          if (this.copyType(b[sort.column.data], sort.column).toLowerCase()
            < this.copyType(a[sort.column.data], sort.column).toLowerCase()) {
            return (sort.asc) ? 1 : -1;
          }
        } else if (sort.type === 'int') {
          if (parseInt(this.copyType(a[sort.column.data], sort.column), 10)
            < parseInt(this.copyType(b[sort.column.data], sort.column), 10)) {
            return (sort.asc) ? -1 : 1;
          }

          if (parseInt(this.copyType(b[sort.column.data], sort.column), 10)
            < parseInt(this.copyType(a[sort.column.data], sort.column), 10)) {
            return (sort.asc) ? 1 : -1;
          }
        } else if (sort.type === 'number') {
          if (parseFloat(this.copyType(a[sort.column.data], sort.column))
            < parseFloat(this.copyType(b[sort.column.data], sort.column))) {
            return (sort.asc) ? -1 : 1;
          }

          if (parseFloat(this.copyType(b[sort.column.data], sort.column))
            < parseFloat(this.copyType(a[sort.column.data], sort.column))) {
            return (sort.asc) ? 1 : -1;
          }
        }

      }
      return 0;
    });
  }

  filterDataSet(
    dataSet: Array<Object>,
    filterList: Array<number>,
    filters: Array<Filter>,
    withPagination: boolean,
    staticDs: boolean,
    pagination: Pagination
  ): Array<number> {
    if (filterList && dataSet) {
      filterList.length = 0;

      for (let i = 0; i < dataSet.length; i++) {
        const obj = dataSet[i];
        let visible = true;

        for (const index in filters) {
          if (filters.hasOwnProperty(index)
            && filters[index].value
            && filters[index].value !== '') {

            const keywords = filters[index].value.split(' ').join('|');
            if (obj[filters[index].column.data]) {
              const txt: string = this.copyType(obj[filters[index].column.data], filters[index].column);

              if (keywords.indexOf('*') === 0) {
                if (!txt.toString().match(new RegExp('(' + keywords.substring(1) + ')', 'gi'))) {
                  visible = false;
                }
              } else {

                if (!txt.toString().match(new RegExp('^(' + keywords + ')', 'gi'))) {
                  visible = false;
                }
              }
            } else {
              visible = false;
            }
          }
        }

        if (visible) {
          filterList.push(i);
        }
      }

      if (withPagination && staticDs) {
        pagination.total = filterList.length;

        const paginatedList: Array<number> = [];
        for (let index = pagination.currentPage * pagination.perPage;
          index < (pagination.currentPage + 1) * pagination.perPage;
          index++) {
          if (filterList[index] !== null) {
            paginatedList.push(filterList[index]);
          }
        }
        filterList = paginatedList;
      }
    }
    return filterList;
  }

  copyType(data: any, column: Column): string {
    return column.cellView['copyData'](data, column);
  }

  pasteType(data: string, column: Column): any {
    return column.cellView['pasteData'](data, column);
  }
}
