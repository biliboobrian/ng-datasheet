import { Injectable } from '@angular/core';
import { Column } from '../models/column';
import { Sort } from '../models/sort';
import { Filter } from '../models/filter';
import { Pagination } from '../models/pagination';
import { ColumnType } from '../models/column-type';
import * as moment_ from 'moment'; const moment = moment_;


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  sortDataSet(dataSet: Array<Object>, sort: Sort): void {
    dataSet.sort((a, b) => {
      if (sort) {
        if (sort.column.getColumnData(a) === null
          || !this.copyType(sort.column.getColumnData(a), sort.column)
          || this.copyType(sort.column.getColumnData(a), sort.column) === '') {
          return 1;
        }

        if (sort.column.getColumnData(b) === null
          || !this.copyType(sort.column.getColumnData(b), sort.column)
          || this.copyType(sort.column.getColumnData(b), sort.column) === '') {
          return -1;
        }
        switch (sort.column.type) {
          case ColumnType.STRING:
            if (this.copyType(sort.column.getColumnData(a), sort.column).toLowerCase()
              < this.copyType(sort.column.getColumnData(b), sort.column).toLowerCase()) {
              return (sort.asc) ? -1 : 1;
            }

            if (this.copyType(sort.column.getColumnData(b), sort.column).toLowerCase()
              < this.copyType(sort.column.getColumnData(a), sort.column).toLowerCase()) {
              return (sort.asc) ? 1 : -1;
            }
            break;
          case ColumnType.INT:
            if (parseInt(this.copyType(sort.column.getColumnData(a), sort.column), 10)
              < parseInt(this.copyType(sort.column.getColumnData(b), sort.column), 10)) {
              return (sort.asc) ? -1 : 1;
            }

            if (parseInt(this.copyType(sort.column.getColumnData(b), sort.column), 10)
              < parseInt(this.copyType(sort.column.getColumnData(a), sort.column), 10)) {
              return (sort.asc) ? 1 : -1;
            }
            break;
          case ColumnType.NUMBER:
            if (parseFloat(this.copyType(sort.column.getColumnData(a), sort.column))
              < parseFloat(this.copyType(sort.column.getColumnData(b), sort.column))) {
              return (sort.asc) ? -1 : 1;
            }

            if (parseFloat(this.copyType(sort.column.getColumnData(b), sort.column))
              < parseFloat(this.copyType(sort.column.getColumnData(a), sort.column))) {
              return (sort.asc) ? 1 : -1;
            }
            break;
          case ColumnType.DATE:
            if (sort.column.getColumnData(a)
              < sort.column.getColumnData(b)) {
              return (sort.asc) ? -1 : 1;
            }

            if (sort.column.getColumnData(b)
              < sort.column.getColumnData(a)) {
              return (sort.asc) ? 1 : -1;
            }
            break;
          case ColumnType.BOOLEAN:
            if (sort.column.getColumnData(a)
              && !sort.column.getColumnData(b)) {
              return (sort.asc) ? -1 : 1;
            }

            if (sort.column.getColumnData(b)
              && !sort.column.getColumnData(a)) {
              return (sort.asc) ? 1 : -1;
            }
            break;

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
            && filters[index].hasOwnProperty('value')
            && filters[index].value !== '') {

            if (!filters[index].column.cellView['filter'](
              filters[index].column.getColumnData(obj),
              filters[index].value,
              filters[index].column)) {
              visible = false;
            }

            /* const keywords = filters[index].value.toString().split(' ').join('|');
            if (obj[filters[index].column.data] !== null) {
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
            } */
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
