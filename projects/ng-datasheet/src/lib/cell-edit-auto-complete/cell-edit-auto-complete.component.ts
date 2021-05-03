import { ItemEvent } from './../models/item-event';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CellDynamicInterface } from '../cell/cell-dynamic-interface';
import { CellDynamicComponent } from '../cell/cell-dynamic-component';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Filter } from '../models/filter';

@Component({
  selector: 'ds-cell-edit-auto-complete',
  templateUrl: './cell-edit-auto-complete.component.html',
  styleUrls: ['./cell-edit-auto-complete.component.css']
})
export class CellEditAutoCompleteComponent extends CellDynamicComponent implements OnInit, CellDynamicInterface, OnDestroy {

  @ViewChild('container', { read: ElementRef, static: true })
  container: ElementRef;

  searching = false;
  searchFailed = false;

  constructor(
    private sanitizer: DomSanitizer
  ) {
    super();
  }


  get dataModel(): string {
    if (this.isFilter) {
      const filters: Array<Filter> = this.data as Array<Filter>;
      return filters.find(filter => {
        return filter.column === this.column;
      }).value;
    } else {
      return this.columnData;
    }
  }

  set dataModel(val: string) {
    if (this.isFilter) {
      const filters: Array<Filter> = this.data as Array<Filter>;
      const f = filters.find(filter => {
        return filter.column === this.column;
      });
      const oldVal = f.value;

      f.value = val;

      if (val === '' && oldVal !== val) {
        this.cellChange.emit(this.data);
      }
    } else {
      this.columnData = val;
    }
  }

  formatter = (obj: Object): string => {
    if (obj) {
      return obj[this.column.options.label];
    } else {
      return '';
    }
  }

  formatText(value: string, term: string): SafeHtml {
    const keywords = CellDynamicComponent.escapeRegExp(term).split(' ').join('|');
    if (keywords.indexOf('\\*') === 0) {
      return this.sanitizer.bypassSecurityTrustHtml(value.replace(new RegExp('(' + keywords.substring(2) + ')', 'gi'), '<b>$1</b>'));
    } else {
      return this.sanitizer.bypassSecurityTrustHtml(value.replace(new RegExp('(' + keywords + ')', 'gi'), '<b>$1</b>'));
    }
  }

  ngOnInit() {
    if (!this.isFilter) {
      this.container.nativeElement.focus();
    }
  }

  ngOnDestroy() {

  }

  getPlaceHolder(): string {
    if (this.isFilter) {
      return this.placeHolder;
    } else {
      return this.column.options.placeHolder;
    }
  }

  onSelectItem(event: NgbTypeaheadSelectItemEvent): void {
    if (this.isFilter) {
      const filters: Array<Filter> = this.data as Array<Filter>;
      filters.find(filter => {
        return filter.column === this.column;
      }).value = event.item;
    }

    this.cellChange.emit(this.data);

    const ie: ItemEvent = new ItemEvent();
    ie.item = event.item;
    ie.data = this.data;
    ie.column = this.column;
    ie.row = this.row;

    this.column.itemEvent.emit(ie);
  }

  onKeyDown(event: KeyboardEvent): void {
    let input: HTMLInputElement;
    switch (event.keyCode) {
      case 37: // left
        input = event.currentTarget as HTMLInputElement;
        if (input.selectionStart === 0) {
          this.key.emit(event);
        }
        break;
      case 39: // right
        input = event.currentTarget as HTMLInputElement;
        if (input.selectionStart === input.value.length) {
          this.key.emit(event);
        }
        break;
      case 38: // up
      case 40: // down
        if (this.container.nativeElement.className.indexOf('open') === -1) {
          this.key.emit(event);
        }
        break;
      case 9: // tab
      case 27: // esc
      case 13: // enter
        this.key.emit(event);
        break;
    }
  }

  onBlur(event: FocusEvent): void {
    this.blurinput.emit(event);
  }
}
