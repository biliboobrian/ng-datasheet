import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RenderingService } from '../services/rendering.service';
import { Column } from '../models/column';
import { Sort } from '../models/sort';
import { RenderEvent } from '../models/render-event';
import { Filter } from '../models/filter';
import { Pagination } from '../models/pagination';
import { DataService } from '../services/data.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[ds-column]',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit {

  @Input() public dataSet: Array<Object>;
  @Input() public filterList: Array<number>;
  @Input() public column: Column;
  @Input() public sort: Sort;
  @Input() public filters: Array<Filter>;
  @Input() public pagination: Pagination;
  @Input() public staticDs = true;
  @Input() public withPagination = false;
  @Input() public previousNoWidth = false;
  @Output() public renderEvent: EventEmitter<RenderEvent> = new EventEmitter<RenderEvent>();
  @Output() public resizeColumn: EventEmitter<Column> = new EventEmitter<Column>();


  private mouseX: number;
  private resizing = false;
  private actualWidth: number;
  private mMove: any;
  private mUp: any;


  constructor(
    public renderingService: RenderingService,
    public dataService: DataService
  ) { }

  ngOnInit() {
  }

  onSort(event: MouseEvent, col: Column) {
    if (!this.column.isResizing) {
      if (col.sortable) {
        if (this.sort && this.sort.column === col) {
          this.sort.asc = !this.sort.asc;
        } else {
          this.sort.column = col;
          this.sort.asc = true;
        }

        this.sort.type = col.type;

        if (this.staticDs) {
          this.dataService.sortDataSet(this.dataSet, this.sort);

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
    }
  }

  onMouseDown(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();

    this.mouseX = event.clientX;
    this.actualWidth = this.column.width;
    this.column.isResizing = true;

    this.mMove = this.onMouseMove.bind(this);
    this.mUp = this.onMouseUp.bind(this);

    window.addEventListener('mousemove', this.mMove);
    window.addEventListener('mouseup', this.mUp);
  }



  onMouseMove(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();

    if (this.column.isResizing) {
      if (this.previousNoWidth) {
        this.column.width = this.actualWidth - event.clientX + this.mouseX;
      } else {
        this.column.width = this.actualWidth + event.clientX - this.mouseX;
      }
    }
  }

  onMouseUp(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();

    if (this.column.isResizing) {
      if (this.previousNoWidth) {
        this.column.width = this.actualWidth - event.clientX + this.mouseX;
      } else {
        this.column.width = this.actualWidth + event.clientX - this.mouseX;
      }
      this.column.isResizing = false;
      window.removeEventListener('mousemove', this.mMove);
      window.removeEventListener('mouseup', this.mUp);
    }
  }
}
