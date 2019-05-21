import { Column } from './../models/column';
import {
  Component, OnInit, ComponentRef,
  ComponentFactoryResolver, Input, ViewChild,
  ViewContainerRef, OnDestroy, Output,
  EventEmitter
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CellDynamicComponent } from './cell-dynamic-component';

@Component({
  selector: 'ds-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit, OnDestroy {

  @Input() component: any;
  @Input() column: Column;
  @Input() row: number;
  @Input() isFilter = false;
  @Input() data: Object;
  @Input() placeHolder: string;
  @Input() dgEditable = true;
  @Output() cellChange: EventEmitter<object> = new EventEmitter();
  @Output() key: EventEmitter<KeyboardEvent> = new EventEmitter();
  @Output() blurinput: EventEmitter<KeyboardEvent> = new EventEmitter();
  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  keySubscription: Subscription;
  focusSubscription: Subscription;
  cellSubscription: Subscription;

  private componentRef: ComponentRef<{}>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    if (this.component) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(this.component);
      this.componentRef = this.container.createComponent(factory);

      const instance = <CellDynamicComponent>this.componentRef.instance;
      instance.column = this.column;
      instance.data = this.data;
      instance.row = this.row;
      instance.isFilter = this.isFilter;
      instance.placeHolder = this.placeHolder;
      instance.dgEditable = this.dgEditable;

      this.cellSubscription = instance.cellChange.subscribe(data => {
        this.cellChange.emit(data);
      });

      this.keySubscription = instance.key.subscribe(keyboardEvent => {
        this.key.emit(keyboardEvent);
      });

      this.focusSubscription = instance.blurinput.subscribe(focusEvent => {
        this.blurinput.emit(focusEvent);
      });
    }
  }

  ngOnDestroy() {
    if (this.componentRef) {

      if (this.cellSubscription) {
        this.cellSubscription.unsubscribe();
      }

      if (this.keySubscription) {
        this.keySubscription.unsubscribe();
      }

      if (this.focusSubscription) {
        this.focusSubscription.unsubscribe();
      }
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
