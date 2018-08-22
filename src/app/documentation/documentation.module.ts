import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentationRoutingModule } from './documentation-routing.module';
import { InstallationComponent } from './installation/installation.component';
import { DatasheetComponent } from './datasheet/datasheet.component';
import { CellsComponent } from './cells/cells.component';
import { ModelsComponent } from './models/models.component';

@NgModule({
  imports: [
    CommonModule,
    DocumentationRoutingModule
  ],
  declarations: [InstallationComponent, DatasheetComponent, CellsComponent, ModelsComponent]
})
export class DocumentationModule { }
