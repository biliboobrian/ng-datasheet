import { WikipediaService } from './services/wikipedia.service';
import { debounceTime, distinctUntilChanged, tap, switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import {
  CellViewBasicComponent,
  CellEditBasicComponent,
  CellViewDateComponent,
  CellEditDateComponent,
  Column,
  Options,
  CellViewButtonComponent,
  CellEditAutoCompleteComponent,
  CellViewLinkComponent,
  ItemEvent,
  DefaultTranslation,
  CellEditNumberComponent,
  CellViewNumberComponent,
  RenderEvent
} from 'projects/ng-datasheet/src/public_api';
import * as moment_ from 'moment';
import { Person } from './models/person';
const moment = moment_;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {

  }
}
