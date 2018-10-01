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
  @Input() data: Object;
  @Output() key: EventEmitter<KeyboardEvent> = new EventEmitter();
  @Output() blurinput: EventEmitter<KeyboardEvent> = new EventEmitter();
  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  keySubscription: Subscription;
  focusSubscription: Subscription;

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
