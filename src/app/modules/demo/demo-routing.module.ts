import { StaticWithEventComponent } from './components/static-with-event/static-with-event.component';
import { DynamicComponent } from './components/dynamic/dynamic.component';
import { DemoComponent } from './components/demo/demo.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaticEditableComponent } from './components/static-editable/static-editable.component';
import { DynamicWithCustomsComponent } from './components/dynamic-with-customs/dynamic-with-customs.component';
import { StaticPaginatedComponent } from './components/static-paginated/static-paginated.component';
import { StaticNotEditableComponent } from './components/static-not-editable/static-not-editable.component';

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
        path: 'static-not-editable',
        component: StaticNotEditableComponent
      },
      {
        path: 'static-paginated',
        component: StaticPaginatedComponent
      },
      {
        path: 'static-with-event',
        component: StaticWithEventComponent
      },
      {
        path: 'dynamic',
        component: DynamicComponent
      },
      {
        path: 'dynamic-with-customs',
        component: DynamicWithCustomsComponent
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
