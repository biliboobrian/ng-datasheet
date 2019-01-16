import { Component, OnInit } from '@angular/core';
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
  ItemEvent
} from 'projects/ng-datasheet/src/public_api';

import * as moment_ from 'moment';
import { Person } from '../../../../models/person';
const moment = moment_;
@Component({
  selector: 'app-static-with-event',
  templateUrl: './static-with-event.component.html',
  styleUrls: ['./static-with-event.component.css']
})
export class StaticWithEventComponent implements OnInit {


  staticColumns: Array<Column>;
  staticDataSet: Array<Person> = [];
  hobbiesDataSet: Array<Object>;

  constructor() { }

  ngOnInit() {
    this.hobbiesDataSet = [
      { id: 1, name: 'Basket ball' },
      { id: 2, name: 'Base ball' },
      { id: 3, name: 'Foot ball' },
      { id: 4, name: 'Swimming' }
    ];


    this.staticDataSet = [];
    let p = new Person();
    p.id = 1;
    p.lastname = 'BANNING';
    p.firstname = 'Peter';
    p.deleted = false;
    p.hobby = 1;
    p.age = 13;
    p.birthdate = moment_(new Date(1967, 11, 12));

    this.staticDataSet.push(p);
    p = new Person();
    p.id = 2;
    p.lastname = 'DOE';
    p.firstname = 'John';
    p.deleted = false;
    p.hobby = 2;
    p.age = 12;
    p.birthdate = moment_(new Date(1983, 2, 27));

    this.staticDataSet.push(p);
    p = new Person();
    p.id = 3;
    p.lastname = 'ANDERSON';
    p.firstname = 'Thomas';
    p.deleted = false;
    p.hobby = 3;
    p.age = 11;
    p.birthdate = moment_(new Date(1977, 10, 2));

    this.staticDataSet.push(p);
    p = new Person();
    p.id = 4;
    p.lastname = 'WATSON';
    p.firstname = 'Sherlock';
    p.deleted = true;
    p.hobby = 4;
    p.age = 100;
    p.birthdate = moment_(new Date(1990, 7, 8));

    this.staticDataSet.push(p);

    this.staticColumns = new Array<Column>();

    let col: Column = new Column('ID', 'id', CellViewBasicComponent, CellEditBasicComponent, 60);
    this.staticColumns.push(col);

    col = new Column('Firstname', 'firstname', CellViewBasicComponent, CellEditBasicComponent, 0);
    col.itemEvent.subscribe(this.onFirstnameChange);
    this.staticColumns.push(col);

    col = new Column('Lastname', 'lastname', CellViewBasicComponent, CellEditBasicComponent, 150);
    this.staticColumns.push(col);

    col = new Column('Age', 'age', CellViewNumberComponent, CellEditNumberComponent, 70);
    col.type = 'number';
    this.staticColumns.push(col);

    col = new Column('is deleted?', 'deleted', CellViewCheckboxComponent, CellEditCheckboxComponent, 150);
    col.itemEvent.subscribe(this.onDeleteChange);
    this.staticColumns.push(col);

    col = new Column('Birthdate', 'birthdate', CellViewDateComponent, CellEditDateComponent, 200);
    col.options = new Options();
    col.options.format = 'DD/MM/YYYY';
    this.staticColumns.push(col);

    col = new Column('Hobby', 'hobby', CellViewObjectComponent, CellEditDropDownComponent, 200);
    col.options = new Options();
    col.options.dataSet = this.hobbiesDataSet;
    col.options.value = 'id';
    col.options.label = 'name';
    col.options.format = 'string';
    this.staticColumns.push(col);

    col = new Column('', null, CellViewButtonComponent, CellViewButtonComponent, 71);
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
      },
      {
        icon: 'trash',
        event: this.onDelete,
        color: '#FFFFFF',
        bgColor: 'rgb(191, 0, 0)',
        borderColor: '#FFFFFF'
      },
    ];
    this.staticColumns.push(col);
  }

  onEdit = (event: MouseEvent, data: Object) => {
  }

  onDelete = (event: MouseEvent, data: Object) => {
  }

  createItem() {
    return new Person();
  }

  onFirstnameChange(event: ItemEvent): void {

  }

  onDeleteChange(event: ItemEvent): void {

  }

}
