import { Component, OnInit, Input } from '@angular/core';
import { ParameterButton } from '../models/parameter-button';

@Component({
  selector: '[ds-global-menu]',
  templateUrl: './global-menu.component.html',
  styleUrls: ['./global-menu.component.css']
})
export class GlobalMenuComponent implements OnInit {

  @Input() public parameterButtons: Array<ParameterButton>;
  @Input() public dataSet: Array<Object>;
  @Input() public filterList: Array<number>;
  @Input() public selection: Object = {};

  constructor() { }

  ngOnInit() {
  }

  onSelectAll(event: MouseEvent) {
    if (this.dataSet) {
      for (let index = 0; index < this.dataSet.length; index++) {
        this.selection[index] = true;
      }
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
      for (let index = 0; index < this.dataSet.length; index++) {
        this.selection[index] = false;
      }
    }
  }

}
