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
    ClsOptionsComponent
  ],
  bootstrap: [DocumentationComponent]
})
export class DocumentationModule { }
