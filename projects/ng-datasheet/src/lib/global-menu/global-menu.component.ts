import { DefaultTranslation } from './../models/default-translation';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ParameterButton } from '../models/parameter-button';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[ds-global-menu]',
  templateUrl: './global-menu.component.html',
  styleUrls: ['./global-menu.component.css']
})
export class GlobalMenuComponent implements OnInit {

  @Input() public defaultTranslation: DefaultTranslation = new DefaultTranslation();
  @Input() public parameterButtons: Array<ParameterButton>;
  @Input() public dataSet: Array<Object>;
  @Input() public filterList: Array<number>;
  @Input() public selection: Object = {};

  @Output() public selectEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onSelectAll(event: MouseEvent) {
    if (this.dataSet) {
      this.selectEvent.emit(true);
    }

  }

  onSelectDisplayed(event: MouseEvent) {
    if (this.filterList) {
      for (let index = 0; index < this.filterList.length; index++) {
        this.selection[this.filterList[index]] = true;
      }
    }
  }

  onUnselectAll(event: MouseEvent) {
    if (this.dataSet) {
      this.selectEvent.emit(false);
    }
  }

}
