import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { CellViewBasicComponent } from './../../../../../../projects/ng-datasheet/src/lib/cell-view-basic/cell-view-basic.component';
import { CellEditBasicComponent } from './../../../../../../projects/ng-datasheet/src/lib/cell-edit-basic/cell-edit-basic.component';
import { CellViewLinkComponent } from './../../../../../../projects/ng-datasheet/src/lib/cell-view-link/cell-view-link.component';
import { Column } from './../../../../../../projects/ng-datasheet/src/lib/models/column';
import { Component, OnInit, ViewChild } from '@angular/core';
import { WikipediaService } from 'src/app/services/wikipedia.service';
import { Options, NgDatasheetComponent } from 'projects/ng-datasheet/src/public_api';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-static-paginated',
  templateUrl: './static-paginated.component.html',
  styleUrls: ['./static-paginated.component.css']
})
export class StaticPaginatedComponent implements OnInit {

  @ViewChild('paginatedDataSheet',  { read: NgDatasheetComponent }) paginatedDataSheet: NgDatasheetComponent;

  paginatedColumns: Array<Column>;
  paginatedDataSet: Array<Object> = [];

  searching = false;
  searchFailed = false;
  wikiSearch = 'art';

  constructor(
    private wikiService: WikipediaService
  ) { }

  ngOnInit() {

    this.paginatedColumns = new Array<Column>();



    this.searchWiki();
  }

  inlineSearchWiki = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.wikiService.search(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    );
  }

  searchWiki(event?: MouseEvent): void {
    this.wikiService.search(this.wikiSearch).subscribe(data => {
      this.paginatedDataSet = data;

      let col: Column = new Column('Name', 'name', CellViewLinkComponent, CellEditBasicComponent, 200);
      col.options = new Options();
      col.options.label = 'name';
      col.options.value = 'link';
      col.options.format = '_blank';
      col.editable = false;
      this.paginatedColumns.push(col);

      col = new Column('Description', 'descr', CellViewBasicComponent, CellEditBasicComponent, 0);
      col.editable = false;
      this.paginatedColumns.push(col);

      this.paginatedDataSheet.updateDatasheet();
    });
  }
}
