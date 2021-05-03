import { Component, OnInit, ViewChild } from '@angular/core';
import {
  CellViewBasicComponent,
  CellEditBasicComponent,
  CellViewDateComponent,
  CellEditDateComponent,
  Column,
  Options,
  CellEditDropDownComponent,
  CellViewObjectComponent,
  CellEditNumberComponent,
  CellViewNumberComponent,
  CellViewCheckboxComponent,
  CellEditCheckboxComponent,
  CellViewButtonComponent,
  ItemEvent,
  ColumnValidator,
  SelectionEvent,
  NgDatasheetComponent,
  CellEvent,
  ColumnType
} from 'projects/ng-datasheet/src/public_api';

import * as moment_ from 'moment';
import { Person } from '../../../../models/person';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-static-editable',
  templateUrl: './static-editable.component.html',
  styleUrls: ['./static-editable.component.css']
})
export class StaticEditableComponent implements OnInit {

  @ViewChild('dg',  { read: NgDatasheetComponent, static: true }) dg: NgDatasheetComponent;

  staticColumns: Array<Column>;
  staticDataSet: Array<Person> = [];
  hobbiesDataSet: Array<Object>;
  formGroup: FormGroup;
  navFlag = 'test';

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.hobbiesDataSet = [
      { id: 1, name: 'Basket ball' },
      { id: 2, name: 'Base ball' },
      { id: 3, name: 'Foot ball' },
      { id: 4, name: 'Swimming' }
    ];


    this.staticDataSet = [];
    let p = new Person();
    const parentp = new Person();


    p = new Person();
    p.id = 2;
    p.lastname = 'DOE';
    p.firstname = 'John';
    p.deleted = false;
    p.hobby = { id: 1, name: 'Basket ball' };
    p.age = 20;
    p.birthdate = moment_(new Date(1983, 2, 27));

    parentp.id = 1;
    parentp.lastname = 'BANNING';
    parentp.firstname = 'Peter';
    parentp.deleted = true;
    parentp.hobby = 1;
    parentp.age = 10;
    parentp.birthdate = moment_(new Date(1967, 2, 22));
    p.parent = parentp;

    this.staticDataSet.push(p);
    p = new Person();
    p.id = 3;
    p.lastname = 'ANDERSON';
    p.firstname = 'Thomas';
    p.deleted = false;
    p.hobby = 3;
    p.age = 50;
    p.birthdate = moment_(new Date(1977, 10, 2));

    this.staticDataSet.push(p);
    p = new Person();
    p.id = 4;
    p.lastname = 'WATSON';
    p.firstname = 'Sherlock';
    p.deleted = true;
    p.hobby = 4;
    p.age = 19;
    p.birthdate = moment_(new Date(1990, 7, 8));

    p = new Person();
    p.id = 1;
    p.lastname = 'BANNING';
    p.firstname = 'Peter';
    p.deleted = false;
    p.hobby = 1;
    p.age = 10;
    p.birthdate = moment_(new Date(1967, 2, 22));

    this.staticDataSet.push(p);
    p = new Person();
    p.id = 2;
    p.lastname = 'DOE';
    p.firstname = 'John';
    p.deleted = false;
    p.hobby = 2;
    p.age = 20;
    p.birthdate = moment_(new Date(1983, 2, 27));

    this.staticDataSet.push(p);
    p = new Person();
    p.id = 3;
    p.lastname = 'ANDERSON';
    p.firstname = 'Thomas';
    p.deleted = false;
    p.hobby = 3;
    p.age = 50;
    p.birthdate = moment_(new Date(1977, 10, 2));

    this.staticDataSet.push(p);
    p = new Person();
    p.id = 4;
    p.lastname = 'WATSON';
    p.firstname = 'Sherlock';
    p.deleted = true;
    p.hobby = 4;
    p.age = 19;
    p.birthdate = moment_(new Date(1990, 7, 8));

    p = new Person();
    p.id = 10;
    p.lastname = 'BANNING';
    p.firstname = 'Peter';
    p.deleted = false;
    p.hobby = 1;
    p.age = 10;
    p.birthdate = moment_(new Date(1967, 2, 22));

    this.staticDataSet.push(p);
    p = new Person();
    p.id = 20;
    p.lastname = 'DOE';
    p.firstname = 'John';
    p.deleted = false;
    p.hobby = 2;
    p.age = 20;
    p.birthdate = moment_(new Date(1983, 2, 27));

    this.staticDataSet.push(p);
    p = new Person();
    p.id = 30;
    p.lastname = 'ANDERSON';
    p.firstname = 'Thomas';
    p.deleted = false;
    p.hobby = 3;
    p.age = 50;
    p.birthdate = moment_(new Date(1977, 10, 2));

    this.staticDataSet.push(p);
    p = new Person();
    p.id = 4;
    p.lastname = 'WATSON';
    p.firstname = 'Sherlock';
    p.deleted = true;
    p.hobby = 4;
    p.age = 19;
    p.birthdate = moment_(new Date(1990, 7, 8));

    p = new Person();
    p.id = 1;
    p.lastname = 'BANNING';
    p.firstname = 'Peter';
    p.deleted = false;
    p.hobby = 1;
    p.age = 10;
    p.birthdate = moment_(new Date(1967, 2, 22));

    this.staticDataSet.push(p);
    p = new Person();
    p.id = 2;
    p.lastname = 'DOE';
    p.firstname = 'John';
    p.deleted = false;
    p.hobby = 2;
    p.age = 20;
    p.birthdate = moment_(new Date(1983, 2, 27));

    this.staticDataSet.push(p);
    p = new Person();
    p.id = 3;
    p.lastname = 'ANDERSON';
    p.firstname = 'Thomas';
    p.deleted = false;
    p.hobby = 3;
    p.age = 50;
    p.birthdate = moment_(new Date(1977, 10, 2));

    this.staticDataSet.push(p);
    p = new Person();
    p.id = 4;
    p.lastname = 'WATSON';
    p.firstname = 'Sherlock';
    p.deleted = true;
    p.hobby = 4;
    p.age = 19;
    p.birthdate = moment_(new Date(1990, 7, 8));

    this.staticDataSet.push(p);
    p = new Person();
    p.id = 4;
    p.lastname = 'WATSON';
    p.firstname = 'Sherlock';
    p.deleted = true;
    p.hobby = 4;
    p.age = 19;
    p.birthdate = moment_(new Date(1990, 7, 8));
    this.staticDataSet.push(p);
    p = new Person();
    p.id = 4;
    p.lastname = 'WATSON';
    p.firstname = 'Sherlock';
    p.deleted = true;
    p.hobby = 4;
    p.age = 19;
    p.birthdate = moment_(new Date(1990, 7, 8));
    this.staticDataSet.push(p);
    p = new Person();
    p.id = 4;
    p.lastname = 'WATSON';
    p.firstname = 'Sherlock';
    p.deleted = true;
    p.hobby = 4;
    p.age = 19;
    p.birthdate = moment_(new Date(1990, 7, 8));
    this.staticDataSet.push(p);
    p = new Person();
    p.id = 4;
    p.lastname = 'WATSON';
    p.firstname = 'Sherlock';
    p.deleted = true;
    p.hobby = 4;
    p.age = 19;
    p.birthdate = moment_(new Date(1990, 7, 8));
    this.staticDataSet.push(p);
    this.staticColumns = new Array<Column>();

    let col: Column = new Column('ID', 'id', CellViewBasicComponent, CellEditBasicComponent, 60);
    col.type = ColumnType.INT;
    this.staticColumns.push(col);

    col = new Column('Firstname', 'firstname', CellViewBasicComponent, CellEditBasicComponent, 0);
    col.autoOpen = true;
    col.searchContains = true;
    col.columnValidators = [
      new ColumnValidator(
        Validators.required,
        'Lastname is required.'
      )
    ];
    this.staticColumns.push(col);

    col = new Column('Lastname', 'lastname', CellViewBasicComponent, CellEditBasicComponent, 150);

    col.columnValidators = [
      new ColumnValidator(
        Validators.required,
        'Lastname is required.'
      ),
      new ColumnValidator(
        null,
        'val function.',
        this.val
      ),
      new ColumnValidator(
        Validators.maxLength(5),
        'Lastname must have less than 6 chars.'
      )
    ];
    col.cellClassFunction = this.getClassHobby;

    this.staticColumns.push(col);

    col = new Column('Age', 'age', CellViewNumberComponent, CellEditNumberComponent, 70);

    col.columnValidators = [
      new ColumnValidator(
        Validators.max(18),
        'Person must be less than 18yo'
      )
    ];
    this.staticColumns.push(col);

    col = new Column('is deleted?', 'deleted', CellViewCheckboxComponent, CellEditCheckboxComponent, 150);
    col.type = ColumnType.BOOLEAN;
    this.staticColumns.push(col);

    col = new Column('Birthdate', 'birthdate', CellViewDateComponent, CellEditDateComponent, 200);
    col.type = ColumnType.DATE;
    col.options = new Options();
    col.options.format = 'DD/MM/YYYY';
    col.columnValidators = [
      new ColumnValidator(
        Validators.required,
        'Lastname is required.'
      )
    ];
    this.staticColumns.push(col);

    col = new Column('Parent Deleted?', 'deleted', CellViewCheckboxComponent, CellEditCheckboxComponent, 200);

    col.itemEvent.subscribe(data => {
      this.itemEv(data);
    });
    this.staticColumns.push(col);

    col = new Column('Hobby', 'hobby', CellViewObjectComponent, CellEditDropDownComponent, 200);

    col.options = new Options();
    col.autoOpen = true;
    col.options.dataSet = this.hobbiesDataSet;
    col.options.value = 'id';
    col.options.label = 'name';
    col.backgroundColor = '#b9ffc9';
    
    col.columnValidators = [
      new ColumnValidator(
        Validators.required,
        'Lastname is required.'
      )
    ];
    col.itemEvent.subscribe(data => {
      this.itemEv(data);
    });
    col.cellClassFunction = this.getClassHobby;
    this.staticColumns.push(col);

    col = new Column('', null, CellViewButtonComponent, CellViewButtonComponent, 30);

    col.selectable = false;
    col.searchable = false;
    col.editable = false;
    col.sortable = false;
    col.neededForAdd = false;
    col.options = new Options();
    col.options.dataSet = [
      {
        icon: 'edit',
        event: this.onEdit,
        color: '#FFFFFF',
        bgColor: 'rgb(0, 102, 150)',
        borderColor: '#FFFFFF'
      }
    ];
    this.staticColumns.push(col);
  }

  df = (data: Object) => {
    if (data['firstname'] === 'John') {
      return true;
    } else {
      return false;
    }
  }

  onSelectEvent(event: SelectionEvent) {
    console.log('--- selectionEvent ---');
    console.log(event);
  }

  onEdit = (event: MouseEvent, data: Object) => {
  }

  onDelete = (event: MouseEvent, data: Object) => {
    alert('polp');
  }

  onDeleteEvent(data) {
    alert('polp');
  }

  setCoord() {
    this.dg.setSelectedCell(2, 2);
  }

  createItem() {
    return new Person();
  }

  onBtnClick(event:MouseEvent) {
    alert('helo');
  }

  itemEv(event: ItemEvent) {
    console.log('plop');
  }

  onRowEvent(actualRow, row, column) {

  } 
  
  onSelectCell(event: CellEvent) {
    console.log(event);
  }

  getClassHobby(col: Column, obj: Person, row: number) {
    if (row % 2 === 0) {
      return ['hobby'];
    }

  }

  editableFunc(col:Column, row: number) {
    if(row < 5) {
      return true;
    } else {
      return false;
    }
    
  }

  val(col: Column, data: Person, row: number): boolean {
    return true;
  }
}
