import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentationRoutingModule } from './documentation-routing.module';
import { DatasheetComponent } from './components/datasheet/datasheet.component';
import { CellsComponent } from './components/cells/cells.component';
import { ModelsComponent } from './components/models/models.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { NgDatasheetComponent } from './components/datasheet/components/ng-datasheet/ng-datasheet.component';
import { ClsColumnComponent } from './components/datasheet/components/cls-column/cls-column.component';
import { ClsParameterButtonComponent } from './components/datasheet/components/cls-parameter-button/cls-parameter-button.component';
import { ClsDefaultTranslationComponent } from './components/datasheet/components/cls-default-translation/cls-default-translation.component';
import { ClsFilterComponent } from './components/datasheet/components/cls-filter/cls-filter.component';
import { ClsPaginationComponent } from './components/datasheet/components/cls-pagination/cls-pagination.component';
import { ClsSortComponent } from './components/datasheet/components/cls-sort/cls-sort.component';
import { ClsRenderEventComponent } from './components/datasheet/components/cls-render-event/cls-render-event.component';
import { ClsOptionsComponent } from './components/datasheet/components/cls-options/cls-options.component';
import { ClsDateComponent } from './components/cells/components/cls-date/cls-date.component';
import { ClsAutoCompleteComponent } from './components/cells/components/cls-auto-complete/cls-auto-complete.component';
import { ClsBasicComponent } from './components/cells/components/cls-basic/cls-basic.component';
import { ClsCellsComponent } from './components/cells/components/cls-cells/cls-cells.component';
import { ClsObjectComponent } from './components/cells/components/cls-object/cls-object.component';
import { ClsNumberComponent } from './components/cells/components/cls-number/cls-number.component';
import { ClsLinkComponent } from './components/cells/components/cls-link/cls-link.component';
import { ClsButtonComponent } from './components/cells/components/cls-button/cls-button.component';
import { ClsCheckboxComponent } from './components/cells/components/cls-checkbox/cls-checkbox.component';
import { ClsDropDownComponent } from './components/cells/components/cls-drop-down/cls-drop-down.component';


@NgModule({
  imports: [
    CommonModule,
    DocumentationRoutingModule
  ],
  declarations: [
    DatasheetComponent,
    CellsComponent,
    ModelsComponent,
    DocumentationComponent,
    NgDatasheetComponent,
    ClsColumnComponent,
    ClsParameterButtonComponent,
    ClsDefaultTranslationComponent,
    ClsFilterComponent,
    ClsPaginationComponent,
    ClsSortComponent,
    ClsRenderEventComponent,
    ClsOptionsComponent,
    ClsDateComponent,
    ClsAutoCompleteComponent,
    ClsBasicComponent,
    ClsCellsComponent,
    ClsObjectComponent,
    ClsNumberComponent,
    ClsLinkComponent,
    ClsButtonComponent,
    ClsCheckboxComponent,
    ClsDropDownComponent,
  ],
  bootstrap: [DocumentationComponent]
})
export class DocumentationModule { }
