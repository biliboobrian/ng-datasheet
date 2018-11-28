import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.css']
})
export class InstallationComponent implements OnInit {


  code = `import { NgDatasheetModule } from '@biliboobrian/ng-datasheet';

  ...

  @NgModule({
    imports: [
      CommonModule,
      ...
      NgDatasheetModule
    ],
    declarations: [
      ...
    ]
  })`;

  code_2 = `<ds-datasheet
    [trBgColor]="'#fffede'"
    [dataSet]="dataSet"
    [columns]="columns">
  </ds-datasheet>`;

  code_3 = `import {
    CellViewBasicComponent,
    CellEditBasicComponent,
    Column
  } from '@biliboobrian/ng-datasheet';

  ...

  export class yourComponent implements OnInit {

    columns: Array<Column>;
    dataSet: Array<object> = [];

    ...

    ngOnInit() {
      let col: Column = new Column();
      col.title = 'ID';
      col.data = 'id';
      col.width = 60;
      col.editable = false;
      col.cellView = CellViewBasicComponent;
      col.cellEdit = CellEditBasicComponent;
      this.columns.push(col);

      col = new Column();
      col.title = 'Firstname';
      col.data = 'firstname';
      col.noWidth = true;
      col.cellView = CellViewBasicComponent;
      col.cellEdit = CellEditBasicComponent;
      this.columns.push(col);

      ...
    }`;

  constructor() { }

  ngOnInit() {
  }

}
