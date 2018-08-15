import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgDatasheetModule } from 'ng-datasheet';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgDatasheetModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '**', redirectTo: ''}
    ]),
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
