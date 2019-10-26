import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ds-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit {

  @ViewChild('myDrop', { read: ElementRef }) myDrop: ElementRef;

  private isOpen = false;

  constructor() { }

  ngOnInit() {
  }

  public toggleContext(x: number, y: number) {
    if (this.isOpen) {
      this.closeContext();
    } else {
      this.openContext(x, y);
    }
  }

  public openContext(x: number, y: number) {
    this.isOpen = true;
    this.myDrop.nativeElement.style.display = 'block';
    this.myDrop.nativeElement.style.top = y.toString() + 'px';
    this.myDrop.nativeElement.style.left = x.toString() + 'px';
  }

  public closeContext() {
    this.isOpen = false;
    this.myDrop.nativeElement.style.display = 'none';
  }
}
