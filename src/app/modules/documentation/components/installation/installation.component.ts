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
      // using argument in Column constructor
      let col: Column = new Column('ID', 'id', CellViewBasicComponent, CellEditBasicComponent 60);
      this.columns.push(col);

      // using properties
      col = new Column();
      col.title = 'Firstname';
      col.data = 'firstname';
      col.noWidth = true;
      col.cellView = CellViewBasicComponent;
      col.cellEdit = CellEditBasicComponent;
      this.columns.push(col);

      ...
    }`;

  code_fa = `
  ...

  "styles": [
    "src/styles.css",
    "node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css",
    "node_modules/@fortawesome/fontawesome-free/css/all.css"
  ],
  
  ...
  `;

  constructor() { }

  ngOnInit() {
  }

}
