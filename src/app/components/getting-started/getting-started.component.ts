import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.css']
})
export class GettingStartedComponent implements OnInit {



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

  code_html = `
  ...

      <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" 
      integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
      <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap-grid.min.css" rel="stylesheet">
    </head>
    <body>
      <app-root></app-root>
    </body>
  </html>
  `;

  constructor() { }

  ngOnInit() {
  }

}
