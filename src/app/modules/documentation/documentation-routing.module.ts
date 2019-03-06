import { ModelsComponent } from './components/models/models.component';
import { CellsComponent } from './components/cells/cells.component';
import { DatasheetComponent } from './components/datasheet/datasheet.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DocumentationComponent,
    children: [
      {
        path: 'datasheet',
        component: DatasheetComponent
      },
      {
        path: 'datasheet/:nav',
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
        redirectTo: 'datasheet',
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
