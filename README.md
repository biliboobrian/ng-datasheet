# ng-datasheet
Datasheet library with or without inline modifications

###Installation via NPM

This project has been created with Angular 6+, it is compatible with Angular 7. It is using for dependencies [ng-bootstrap](https://ng-bootstrap.github.io/#/home), [font-awsome](https://fontawesome.com/) and [moment](https://momentjs.com/).

the project is available on [Github](https://github.com/biliboobrian/ng-datasheet) and installation using [npm](https://www.npmjs.com/package/@biliboobrian/ng-datasheet).

`npm install --save @biliboobrian/ng-datasheet @ng-bootstrap/ng-bootstrap moment moment-es6 font-awesome`

### Import inside your NgModule

Import the library inside your NgModule by adding the import statment and adding an import 'NgDatasheetModule' inside your @NgModule imports object.

	import { NgDatasheetModule } from '@biliboobrian/ng-datasheet';
	
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
	})

###Instanciate your first Ng-DataSheet

In a component child of your module, add in the .html file the ng-datasheet tag.

	<ds-datasheet
		[trBgColor]="'#fffede'"
		[dataSet]="dataSet"
		[columns]="columns">
	</ds-datasheet>

And add in the .ts file the description of your columns and the dataSet Object.

	import {
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
		}

For more information, documentation and demo please see the [Homepage](https://github.com/biliboobrian/ng-datasheet).
