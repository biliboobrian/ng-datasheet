import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CellDynamicComponent } from '../Cell/cell-dynamic-component';
import { CellDynamicInterface } from '../Cell/cell-dynamic-interface';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Column } from '../models/column';

@Component({
  selector: 'ds-cell-view-link',
  templateUrl: './cell-view-link.component.html',
  styleUrls: ['./cell-view-link.component.css']
})
export class CellViewLinkComponent extends CellDynamicComponent implements OnInit, CellDynamicInterface {

  @ViewChild('container', { read: ElementRef })
  container: ElementRef;

  usePointer = false;

  constructor(
    private router: Router
  ) {
    super();
  }

  public static copyData(data: any, column: Column): string {
    if (data && column.options.label) {
      return data[column.options.label];
    } else {
      return null;
    }

  }

  public static pasteData(data: string, column: Column): any {
    if (column.options.dataSet) {
      for (let i = 0; i < column.options.dataSet.length; i++) {
        if (column.options.dataSet[i][column.options.label] === data) {
          return column.options.dataSet[i];
        }
      }
    } else if (column.options.retreiveFunction) {
      const objFunction = column.options.retreiveFunction() as Observable<any>;
      const subObjFunction: Subscription = objFunction.subscribe(element => {
        subObjFunction.unsubscribe();
        return element;
      });
    }
    return null;
  }

  ngOnInit() {
    this.container.nativeElement.focus();
  }

  onClick(event: MouseEvent): void {
    if (event.ctrlKey) {
      if (this.column.options.format === 'routerLink') {
        if (this.data[this.column.data] instanceof Object) {
          this.router.navigateByUrl(this.data[this.column.data][this.column.options.value]);
        } else {
          this.router.navigateByUrl(this.data[this.column.options.value]);
        }
      } else {
        if (this.data[this.column.data] instanceof Object) {
          window.open(this.data[this.column.data][this.column.options.value], this.column.options.format);
        } else {
          window.open(this.data[this.column.options.value], this.column.options.format);
        }
      }
    }
  }

  getLabel(): string {
    if (this.column && this.column.options) {
      if (this.data[this.column.data] instanceof Object) {
        return this.data[this.column.data][this.column.options.label];
      } else {
        return this.data[this.column.options.label];
      }
    }
    return '';
  }
}
