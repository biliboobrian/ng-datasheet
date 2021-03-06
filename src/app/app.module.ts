import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GettingStartedComponent } from './components/getting-started/getting-started.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgDatasheetModule } from 'projects/ng-datasheet/src/public_api';
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    GettingStartedComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    NgDatasheetModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
