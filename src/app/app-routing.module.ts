import { GettingStartedComponent } from './components/getting-started/getting-started.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'demo',
    loadChildren: './modules/demo/demo.module#DemoModule'
  },
  {
    path: 'doc',
    loadChildren: './modules/documentation/documentation.module#DocumentationModule'
  },
  {
    path: '',
    component: GettingStartedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
