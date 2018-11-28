import { ModelsComponent } from './components/models/models.component';
import { CellsComponent } from './components/cells/cells.component';
import { DatasheetComponent } from './components/datasheet/datasheet.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstallationComponent } from './components/installation/installation.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentationComponent,
    children: [
      {
        path: 'installation',
        component: InstallationComponent
      },
      {
        path: 'datasheet',
        component: DatasheetComponent
      },
      {
        path: 'cells',
        component: CellsComponent
      },
      {
        path: 'models',
        component: ModelsComponent
      },
      {
        path: '',
        redirectTo: 'installation',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentationRoutingModule { }
