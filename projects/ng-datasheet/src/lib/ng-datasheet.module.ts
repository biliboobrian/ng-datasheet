import {
  NgbModule, NgbTypeaheadModule, NgbDatepickerModule,
  NgbDropdownModule,
  NgbButtonsModule,
  NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { CellViewLinkComponent } from './cell-view-link/cell-view-link.component';
import { RouterModule } from '@angular/router';
import { GlobalMenuComponent } from './global-menu/global-menu.component';
import { ColumnComponent } from './column/column.component';
import { FilterComponent } from './filter/filter.component';
import { RowComponent } from './row/row.component';
import { CellEditNumberComponent } from './cell-edit-number/cell-edit-number.component';
import { CellViewNumberComponent } from './cell-view-number/cell-view-number.component';
import { CellViewCheckboxComponent } from './cell-view-checkbox/cell-view-checkbox.component';
import { CellEditCheckboxComponent } from './cell-edit-checkbox/cell-edit-checkbox.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { CellDynamicComponent } from './cell/cell-dynamic-component';

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    NgbButtonsModule,
    NgbTooltipModule,
    RouterModule,
    NgSelectModule
  ],
  declarations: [
    NgDatasheetComponent,
    CellComponent,
    CellDynamicComponent,
    CellViewBasicComponent,
    CellViewButtonComponent,
    CellViewDateComponent,
    CellViewObjectComponent,
    CellViewLinkComponent,
    CellEditBasicComponent,
    CellEditAutoCompleteComponent,
    CellEditDropDownComponent,
    CellEditDateComponent,
    GlobalMenuComponent,
    ColumnComponent,
    FilterComponent,
    RowComponent,
    CellEditNumberComponent,
    CellViewNumberComponent,
    CellViewCheckboxComponent,
    CellEditCheckboxComponent,
    ContextMenuComponent
  ],
  entryComponents: [
    CellViewBasicComponent,
    CellViewButtonComponent,
    CellViewDateComponent,
    CellViewObjectComponent,
    CellViewLinkComponent,
    CellViewNumberComponent,
    CellViewCheckboxComponent,
    CellEditBasicComponent,
    CellEditAutoCompleteComponent,
    CellEditDropDownComponent,
    CellEditDateComponent,
    CellEditNumberComponent,
    CellEditCheckboxComponent
  ],
  exports: [
    NgDatasheetComponent
  ]
})
export class NgDatasheetModule { }
