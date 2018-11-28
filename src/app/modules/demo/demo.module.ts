import { NgDatasheetModule } from 'ng-datasheet';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { StaticNotPaginatedComponent } from './components/static-not-paginated/static-not-paginated.component';
import { StaticPaginatedComponent } from './components/static-paginated/static-paginated.component';
import { DemoComponent } from './components/demo/demo.component';
import { StaticEditableComponent } from './components/static-editable/static-editable.component';

@NgModule({
  imports: [
    CommonModule,
    DemoRoutingModule,
    NgDatasheetModule
  ],
  declarations: [StaticNotPaginatedComponent, StaticPaginatedComponent, DemoComponent, StaticEditableComponent]
})
export class DemoModule { }
