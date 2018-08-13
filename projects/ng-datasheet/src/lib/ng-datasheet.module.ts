import {
  NgbModule, NgbTypeaheadModule, NgbDatepickerModule,
  NgbDropdownModule
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgDatasheetComponent } from './ng-datasheet.component';
import { CellComponent } from './cell/cell.component';
import { CellViewBasicComponent } from './cell-view-basic/cell-view-basic.component';
import { CellEditBasicComponent } from './cell-edit-basic/cell-edit-basic.component';
import { CommonModule } from '@angular/common';
import { CellEditAutoCompleteComponent } from './cell-edit-auto-complete/cell-edit-auto-complete.component';
import { CellEditDropDownComponent } from './cell-edit-drop-down/cell-edit-drop-down.component';
import { CellViewButtonComponent } from './cell-view-button/cell-view-button.component';
import { CellViewDateComponent } from './cell-view-date/cell-view-date.component';
import { CellEditDateComponent } from './cell-edit-date/cell-edit-date.component';
import { CellViewObjectComponent } from './cell-view-object/cell-view-object.component';

@NgModule({
  imports: [
    NgbModule.forRoot(),
    CommonModule,
    FormsModule,
    NgbTypeaheadModule,
    NgbDatepickerModule,
    NgbDropdownModule
  ],
  declarations: [
    NgDatasheetComponent,
    CellComponent,
    CellViewBasicComponent,
    CellViewButtonComponent,
    CellViewDateComponent,
    CellViewObjectComponent,
    CellEditBasicComponent,
    CellEditAutoCompleteComponent,
    CellEditDropDownComponent,
    CellEditDateComponent
  ],
  entryComponents: [
    CellViewBasicComponent,
    CellViewButtonComponent,
    CellViewDateComponent,
    CellViewObjectComponent,
    CellEditBasicComponent,
    CellEditAutoCompleteComponent,
    CellEditDropDownComponent,
    CellEditDateComponent
  ],
  exports: [
    NgDatasheetComponent
  ]
})
export class NgDatasheetModule { }
