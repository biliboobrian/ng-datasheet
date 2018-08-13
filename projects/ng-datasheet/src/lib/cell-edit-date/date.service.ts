import { Injectable } from '@angular/core';
import { Column } from '../models/column';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  column: Column;

  constructor() { }
}
