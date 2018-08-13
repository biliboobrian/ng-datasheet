import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError, map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CellDynamicInterface } from '../Cell/cell-dynamic-interface';
import { CellDynamicComponent } from '../Cell/cell-dynamic-component';

@Component({
  selector: 'ds-cell-edit-auto-complete',
  templateUrl: './cell-edit-auto-complete.component.html',
  styleUrls: ['./cell-edit-auto-complete.component.css']
})
export class CellEditAutoCompleteComponent extends CellDynamicComponent implements OnInit, CellDynamicInterface {

  @ViewChild('container', { read: ElementRef })
  container: ElementRef;

  searching = false;
  searchFailed = false;

  constructor(
    private sanitizer: DomSanitizer
  ) {
    super();
  }

  formatter = (obj: Object): string => {
    return obj[this.column.options.label];
  }

  formatText(value: string, term: string): SafeHtml {
    const keywords = term.split(' ').join('|');
    return this.sanitizer.bypassSecurityTrustHtml(value.replace(new RegExp('(' + keywords + ')', 'gi'), '<b>$1</b>'));
  }

  ngOnInit() {
    this.container.nativeElement.focus();
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

      case 9: // tab
      case 27: // esc
      case 13: // enter
      case 38: // up
      case 40: // down
        this.key.emit(event);
        break;
    }
  }
}
