# ng-datasheet
Datasheet library with or without inline modifications with many possiblities.
- Keyboard navigation
- Sorting, filtering
- Static complete set of data or lazy data loading
- Column Validation using ReactiveForm Validators
- Extensible Columns type with simple way to create your own type
- Style customization
- Copy / paste of data to excel sheet
- Manage hierarchical set of data

### Installation via NPM

This project has been created with Angular 6+. It is using for dependencies [ng-bootstrap](https://ng-bootstrap.github.io/#/home), [font-awsome](https://fontawesome.com/), [moment](https://momentjs.com/) and [ng-select](https://ng-select.github.io/ng-select#/data-sources).

Check it out on [Github](https://github.com/biliboobrian/ng-datasheet) and installation using [npm](https://www.npmjs.com/package/@biliboobrian/ng-datasheet).

`npm install --save @biliboobrian/ng-datasheet @ng-bootstrap/ng-bootstrap @ng-select/ng-select @fortawesome/fontawesome-free moment moment-es6`

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

### Instanciate your first Ng-DataSheet

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
			let col: Column = new Column('ID', 'id', CellViewBasicComponent, CellEditBasicComponent, 60);
			this.columns.push(col);

			col = new Column('Firstname', 'firstname', CellViewBasicComponent, CellEditBasicComponent, 0);
			this.columns.push(col);

			...
		}

For more information, documentation and demo please see the [Homepage](https://github.com/biliboobrian/ng-datasheet).
