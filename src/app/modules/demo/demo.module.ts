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
import { StaticWithEventComponent } from './components/static-with-event/static-with-event.component';
import { StaticNotEditableComponent } from './components/static-not-editable/static-not-editable.component';

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
    DynamicWithCustomsComponent,
    StaticWithEventComponent,
    StaticNotEditableComponent
  ]
})
export class DemoModule { }
