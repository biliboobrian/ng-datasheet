import { DemoComponent } from './components/demo/demo.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaticEditableComponent } from './components/static-editable/static-editable.component';

const routes: Routes = [
  {
    path: '',
    component: DemoComponent,
    children: [
      {
        path: 'static-editable',
        component: StaticEditableComponent
      },
      {
        path: '',
        redirectTo: 'static-editable',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
