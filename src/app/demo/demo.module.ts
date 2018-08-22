import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { StaticNotPaginatedComponent } from './static-not-paginated/static-not-paginated.component';
import { StaticPaginatedComponent } from './static-paginated/static-paginated.component';

@NgModule({
  imports: [
    CommonModule,
    DemoRoutingModule
  ],
  declarations: [StaticNotPaginatedComponent, StaticPaginatedComponent]
})
export class DemoModule { }
