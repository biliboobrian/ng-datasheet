import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentationRoutingModule } from './documentation-routing.module';
import { InstallationComponent } from './components/installation/installation.component';
import { DatasheetComponent } from './components/datasheet/datasheet.component';
import { CellsComponent } from './components/cells/cells.component';
import { ModelsComponent } from './components/models/models.component';
import { DocumentationComponent } from './components/documentation/documentation.component';

@NgModule({
  imports: [
    CommonModule,
    DocumentationRoutingModule
  ],
  declarations: [InstallationComponent, DatasheetComponent, CellsComponent, ModelsComponent, DocumentationComponent],
  bootstrap: [DocumentationComponent]
})
export class DocumentationModule { }
