import { FormsModule } from '@angular/forms';
import { NgDatasheetModule } from 'projects/ng-datasheet/src/public_api';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { StaticNotPaginatedComponent } from './components/static-not-paginated/static-not-paginated.component';
import { StaticPaginatedComponent } from './components/static-paginated/static-paginated.component';
import { DemoComponent } from './components/demo/demo.component';
import { StaticEditableComponent } from './components/static-editable/static-editable.component';
import { DynamicComponent } from './components/dynamic/dynamic.component';
import { DynamicWithCustomsComponent } from './components/dynamic-with-customs/dynamic-with-customs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DemoRoutingModule,
    NgDatasheetModule
  ],
  declarations: [
    StaticNotPaginatedComponent,
    StaticPaginatedComponent,
    DemoComponent,
    StaticEditableComponent,
    DynamicComponent,
    DynamicWithCustomsComponent
  ]
})
export class DemoModule { }
