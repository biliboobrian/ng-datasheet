import { Component, OnInit } from '@angular/core';
import {
  Column,
  CellViewBasicComponent,
  CellEditBasicComponent,
  ColumnType,
  ColumnValidator,
  CellViewNumberComponent,
  CellEditNumberComponent,
  CellViewDateComponent,
  CellViewCheckboxComponent,
  CellEditCheckboxComponent,
  CellEditDateComponent,
  CellEditDropDownComponent,
  CellViewObjectComponent,
  Options,
  CellEditAutoCompleteComponent,
  SelectionEvent
} from 'projects/ng-datasheet/src/public_api';
import { Validators } from '@angular/forms';
import { PersonService } from 'src/app/services/person.service';
import { Person } from 'src/app/models/person';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public dataSet: Person[];
  public columns: Column[] = [];
  public hobbiesDataSet = [
    { id: 1, name: 'Basket ball' },
    { id: 2, name: 'Base ball' },
    { id: 3, name: 'Foot ball' },
    { id: 4, name: 'Swimming' }
  ];

  constructor(
    private peopleService: PersonService
  ) { }


  ngOnInit() {
    this.peopleService.createDB();

    this.peopleService.getPeoples().subscribe(people => {
      this.dataSet = people;
      this.initColumns();
    });
  }

  initColumns() {
    let col: Column = new Column('ID', 'id', CellViewBasicComponent, CellEditBasicComponent, 60);
    col.type = ColumnType.INT;
    this.columns.push(col);

    col = new Column('Find Person', 'person', CellViewObjectComponent, CellEditAutoCompleteComponent, 150);
    col.options.retrieveFunction = this.inlineSearchPerson;
    col.options.label = 'lastname';
    this.columns.push(col);

    col = new Column('Firstname', 'firstname', CellViewBasicComponent, CellEditBasicComponent, 0);
    col.columnValidators = [
      new ColumnValidator(
        Validators.required,
        'Firstname is required.'
      )
    ];
    this.columns.push(col);
    

    col = new Column('Lastname', 'lastname', CellViewBasicComponent, CellEditBasicComponent, 150);
    col.autoOpen = true;
    col.selectOnTab = true;


    col.columnValidators = [
      new ColumnValidator(
        Validators.required,
        'Lastname is required.'
      ),
      new ColumnValidator(
        Validators.maxLength(5),
        'Lastname must have less than 6 chars.'
      )
    ];

    this.columns.push(col);

    col = new Column('Age', 'age', CellViewNumberComponent, CellEditNumberComponent, 70);
    col.autoOpen = true;
    col.selectOnTab = true;
    col.columnValidators = [
      new ColumnValidator(
        Validators.max(18),
        'Person must be less than 18yo'
      )
    ];
    this.columns.push(col);

    col = new Column('is deleted?', 'deleted', CellViewCheckboxComponent, CellEditCheckboxComponent, 60);
    col.type = ColumnType.BOOLEAN;
    this.columns.push(col);

    col = new Column('Birthdate', 'birthdate', CellViewDateComponent, CellEditDateComponent, 100);
    col.type = ColumnType.DATE;
    col.options = new Options();
    col.options.format = 'DD/MM/YYYY';
    col.columnValidators = [
      new ColumnValidator(
        Validators.required,
        'Lastname is required.'
      )
    ];
    this.columns.push(col);

    col = new Column('Hobby', 'hobby', CellViewObjectComponent, CellEditDropDownComponent, 150);

    col.options = new Options();
    col.options.dataSet = this.hobbiesDataSet;
    col.options.value = 'id';
    col.options.label = 'name';

    col.columnValidators = [
      new ColumnValidator(
        Validators.required,
        'Lastname is required.'
      )
    ];
    this.columns.push(col);

  }

  createItem() {
    return new Person();
  }

  onSelectEvent(event: SelectionEvent): void {
    console.log(event);
  }

  inlineSearchPerson = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        return this.peopleService.getPeoplesByTerm(term).pipe(
          catchError(() => {
            return of([]);
          }));
      })
    );
  }

}
