import { WikipediaService } from './wikipedia.service';
import { debounceTime, distinctUntilChanged, tap, switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import {
  CellViewBasicComponent,
  CellEditBasicComponent,
  CellViewDateComponent,
  CellEditDateComponent,
  Column,
  Options,
  CellEditDropDownComponent,
  CellViewButtonComponent,
  CellViewObjectComponent,
  CellEditAutoCompleteComponent,
  CellViewLinkComponent
} from 'ng-datasheet';
import * as moment_ from 'moment'; const moment = moment_;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  staticColumns: Array<Column>;
  paginatedColumns: Array<Column>;
  staticDataSet: Array<Object> = [];
  paginatedDataSet: Array<Object> = [];
  hobbiesDataSet: Array<Object> = [];

  searching = false;
  searchFailed = false;
  wikiSearch: string;

  constructor(
    private wikiService: WikipediaService
  ) { }

  ngOnInit() {
    this.hobbiesDataSet = [
      { id: 1, name: 'Basket ball' },
      { id: 2, name: 'Base ball' },
      { id: 3, name: 'Foot ball' },
      { id: 4, name: 'Swimming' }
    ];

    this.staticDataSet = [
      {
        id: 1,
        lastname: 'DOE',
        firstname: 'John',
        hobby: this.hobbiesDataSet[0],
        birthdate: moment_(new Date(1983, 2, 27)),
        wiki: {
          name: 'Poilu',
          link: 'https://en.wikipedia.org/wiki/Poilu'
        }
      },
      {
        id: 2,
        lastname: 'FOE',
        firstname: 'Paul',
        hobby: this.hobbiesDataSet[0],
        birthdate: moment_(new Date(1983, 2, 27)),
        wiki: {
          name: 'Poil de carotte',
          link: 'https://en.wikipedia.org/wiki/Poil_de_carotte'
        }
      }
    ];

    this.staticColumns = new Array<Column>();

    let col: Column = new Column();
    col.title = 'ID';
    col.data = 'id';
    col.width = 60;
    col.editable = false;
    col.cellView = CellViewBasicComponent;
    col.cellEdit = CellEditBasicComponent;
    this.staticColumns.push(col);

    col = new Column();
    col.title = 'Firstname';
    col.data = 'firstname';
    col.width = 150;
    col.cellView = CellViewBasicComponent;
    col.cellEdit = CellEditBasicComponent;
    this.staticColumns.push(col);

    col = new Column();
    col.title = 'Lastname';
    col.data = 'lastname';
    col.width = 150;
    col.cellView = CellViewBasicComponent;
    col.cellEdit = CellEditBasicComponent;
    this.staticColumns.push(col);

    col = new Column();
    col.title = 'Birthdate';
    col.data = 'birthdate';
    col.width = 200;
    col.options = new Options();
    col.options.format = 'DD/MM/YYYY';
    col.cellView = CellViewDateComponent;
    col.cellEdit = CellEditDateComponent;
    this.staticColumns.push(col);

    col = new Column();
    col.title = 'Hobby';
    col.data = 'hobby';
    col.options = new Options();
    col.options.dataSet = this.hobbiesDataSet;
    col.options.value = 'id';
    col.options.label = 'name';
    col.cellView = CellViewObjectComponent;
    col.cellEdit = CellEditDropDownComponent;
    this.staticColumns.push(col);

    col = new Column();
    col.title = 'Wiki';
    col.data = 'wiki';
    col.sortable = false;
    col.noWidth = true;
    col.options = new Options();
    col.options.retreiveFunction = this.inlineSearchWiki;
    col.options.label = 'name';
    col.options.value = 'link';
    col.options.format = '_blank';
    col.options.placeHolder = 'Search ...';
    col.cellView = CellViewLinkComponent;
    col.cellEdit = CellEditAutoCompleteComponent;
    this.staticColumns.push(col);

    col = new Column();
    col.title = 'Actions';
    col.width = 75;
    col.data = null;
    col.selectable = false;
    col.searchable = false;
    col.sortable = false;
    col.editable = false;
    col.neededForAdd = false;
    col.options = new Options();
    col.options.dataSet = [
      { icon: 'cog', event: this.onClick },
      { icon: 'trash', event: this.onDeleteEvent },
    ];
    col.cellView = CellViewButtonComponent;
    col.cellEdit = CellViewButtonComponent;
    this.staticColumns.push(col);

    this.paginatedColumns = new Array<Column>();

    col = new Column();
    col.title = 'Name';
    col.data = 'name';
    col.options = new Options();
    col.options.label = 'name';
    col.options.value = 'link';
    col.options.format = '_blank';
    col.width = 200;
    col.editable = false;
    col.cellView = CellViewLinkComponent;
    col.cellEdit = CellEditBasicComponent;
    this.paginatedColumns.push(col);

    col = new Column();
    col.title = 'Description';
    col.data = 'descr';
    col.noWidth = true;
    col.editable = false;
    col.cellView = CellViewBasicComponent;
    col.cellEdit = CellEditBasicComponent;
    this.paginatedColumns.push(col);
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


  onDeleteEvent = (event: MouseEvent, data: Object) => {
    for (let index = 0; index < this.staticDataSet.length; index++) {
      const element = this.staticDataSet[index];
      if (element === data) {
        this.staticDataSet.splice(index, 1);
      }
    }
  }
  searchWiki(event: MouseEvent): void {
    this.wikiService.search(this.wikiSearch).subscribe(data => {
      this.paginatedDataSet = data;
    });
  }

  onClick = (event: MouseEvent, data: Object) => {
    // this.notificationsService.info('L\'action de l\'ID ' + data['id'] + ' est utilisée.');
  }

  createItem() {
    return {
      id: null,
      lastname: null,
      marque: null,
      birthdate: null,
      client: null
    };
  }
}
