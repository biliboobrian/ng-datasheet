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
  CellViewButtonComponent
} from 'ng-datasheet';

import * as moment_ from 'moment';
import { Person } from '../../../../models/person';
const moment = moment_;

@Component({
  selector: 'app-static-editable',
  templateUrl: './static-editable.component.html',
  styleUrls: ['./static-editable.component.css']
})
export class StaticEditableComponent implements OnInit {


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
    p.birthdate = moment_(new Date(1983, 2, 27));
    p.wiki = {
      name: 'Poilu',
      link: 'https://en.wikipedia.org/wiki/Poilu'
    };

    this.staticDataSet.push(p);
    p = new Person();
    p.id = 1;
    p.lastname = 'DOE';
    p.firstname = 'John';
    p.deleted = false;
    p.hobby = 2;
    p.age = 12;
    p.birthdate = moment_(new Date(1983, 2, 27));
    p.wiki = {
      name: 'Poilu',
      link: 'https://en.wikipedia.org/wiki/Poilu'
    };

    this.staticDataSet.push(p);
    p = new Person();
    p.id = 1;
    p.lastname = 'ANDERSON';
    p.firstname = 'Thomas';
    p.deleted = false;
    p.hobby = 3;
    p.age = 11;
    p.birthdate = moment_(new Date(1983, 2, 27));
    p.wiki = {
      name: 'Poilu',
      link: 'https://en.wikipedia.org/wiki/Poilu'
    };

    this.staticDataSet.push(p);
    p = new Person();
    p.id = 1;
    p.lastname = 'WATSON';
    p.firstname = 'Sherlock';
    p.deleted = true;
    p.hobby = 4;
    p.age = 100;
    p.birthdate = moment_(new Date(1983, 2, 27));
    p.wiki = {
      name: 'Poilu',
      link: 'https://en.wikipedia.org/wiki/Poilu'
    };

    this.staticDataSet.push(p);
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
    col.noWidth = true;
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
    col.title = 'age';
    col.data = 'age';
    col.width = 150;
    col.type = 'number';
    col.cellView = CellViewNumberComponent;
    col.cellEdit = CellEditNumberComponent;
    this.staticColumns.push(col);

    col = new Column();
    col.title = 'is deleted?';
    col.data = 'deleted';
    col.width = 150;
    col.type = 'number';
    col.autoOpen = true;
    col.cellView = CellViewCheckboxComponent;
    col.cellEdit = CellEditCheckboxComponent;
    this.staticColumns.push(col);

    col = new Column();
    col.title = 'Birthdate';
    col.data = 'birthdate';
    col.width = 200;
    col.options = new Options();
    col.options.format = 'DD/MM/YYYY';
    col.autoOpen = true;
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
    col.title = '';
    col.width = 80;
    col.data = null;
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
        bgColor: '#00FF00',
        borderColor: '#FFFFFF'
      },
      {
        icon: 'trash',
        event: this.onDelete,
        color: '#FFFFFF',
        bgColor: '#FF0000',
        borderColor: '#FFFFFF'
      },
    ];

    col.cellView = CellViewButtonComponent;
    col.cellEdit = CellViewButtonComponent;
    this.staticColumns.push(col);
  }

  onEdit = (event: MouseEvent, data: Object) => {
  }

  onDelete = (event: MouseEvent, data: Object) => {
  }

  createItem() {
    return new Person();
  }
}