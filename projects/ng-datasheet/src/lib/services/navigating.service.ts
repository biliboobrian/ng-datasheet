import { Injectable } from '@angular/core';
import { Column } from '../models/column';
import { Filter } from '../models/filter';

@Injectable({
  providedIn: 'root'
})
export class NavigatingService {

  constructor() { }

  initFilters(columns: Array<Column>) {
    const filters: Array<Filter> = new Array<Filter>();

    if (columns) {
      for (let i = 0; i < columns.length; i++) {
        const filter: Filter = new Filter(columns[i]);
        filters.push(filter);
      }
    }


    return filters;
  }
}
