import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Column } from '../models/column';
import { Sort } from '../models/sort';
import { RenderEvent } from '../models/render-event';
import { Filter } from '../models/filter';
import { Pagination } from '../models/pagination';
import { DataService } from '../services/data.service';
import { ItemEvent } from 'ng-datasheet/public_api';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[ds-filter]',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  private _filters: Array<Filter>;

  @Input() public dataSet: Array<Object>;
  @Input() public filterList: Array<number>;
  @Input() public column: Column;
  @Input() public col: number;
  @Input() public sort: Sort;

  @Input() public pagination: Pagination;
  @Input() public staticDs = true;
  @Input() public withPagination = false;
  @Output() public renderEvent: EventEmitter<RenderEvent> = new EventEmitter<RenderEvent>();

  constructor(
    public dataService: DataService
  ) { }

  ngOnInit() {
  }

  get filters(): Array<Filter> {
    return this._filters;
  }

  @Input() set filters(val: Array<Filter>) {
    this._filters = val;
  }

  onFilterChange(event: KeyboardEvent) {
    if (this.withPagination) {
      this.pagination.currentPage = 0;
    }

    if (this.staticDs) {
      this.filterList = this.dataService.filterDataSet(
        this.dataSet,
        this.filterList,
        this.filters,
        this.withPagination,
        this.staticDs,
        this.pagination
      );
    }

    this.renderEvent.emit(new RenderEvent(this.pagination, this.filters, this.sort, this.filterList));
  }

  onItem(event: ItemEvent) {
    this.onFilterChange(null);
  }
}
