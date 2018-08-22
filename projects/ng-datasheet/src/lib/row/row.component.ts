import { Component, OnInit, Input, ElementRef, EventEmitter, Output } from '@angular/core';
import { Coordinate } from '../models/coordinate';
import { Column } from '../models/column';
import { DataService } from '../services/data.service';
import { RenderingService } from '../services/rendering.service';

@Component({
  selector: '[ds-row]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent implements OnInit {

  @Input() public obj: Object;
  @Input() public row: number;
  @Input() public col: number;
  @Input() public dataSet: Array<Object>;
  @Input() public main: Coordinate;
  @Input() public edited: Coordinate;
  @Input() public start: Coordinate;
  @Input() public end: Coordinate;
  @Input() public column: Column;
  @Input() public selected: boolean;
  @Input() public colOnTab: number;
  @Input() public selectBox: any;

  @Input() public newModelFunction: Function;
  @Input() public withAdd = false;
  @Input() public printNew;

  @Output() public keyView: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();
  @Output() public keyEdit: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

  constructor(
    public dataService: DataService,
    public renderingService: RenderingService
  ) { }

  ngOnInit() {
  }

  onKeyView(event: KeyboardEvent) {
    this.keyView.emit(event);
  }

  onKeyEdit(event: KeyboardEvent) {
    this.keyEdit.emit(event);
  }

  onMouseDown(event: MouseEvent) {
    if (this.column.selectable) {
      this.main.setCoord(this.row, this.col);
      this.colOnTab = this.col;
      this.end.empty();

      if (this.edited.row !== this.row || this.edited.col !== this.col) {
        this.edited.empty();
      }

      if (this.row !== -1 && this.edited.isEmpty()) {
        this.selected = false;
        this.start.setCoord(this.row, this.col);
      }
    }
  }

  onMouseOver(event: MouseEvent) {
    if (!this.selected) {
      this.end.setCoord(this.row, this.col);
    }
  }

  onMouseUp(event: MouseEvent) {

    if (!this.selected) {
      if (this.row !== -1) {
        this.end.setCoord(this.row, this.col);
      } else {
        this.end.setCoord(this.dataSet.length - 1, this.col);
      }
    }

    if (this.start.row === this.row && this.start.col === this.col) {
      this.start.empty();
      this.end.empty();
    }

    this.selected = true;

    if (this.edited.isEmpty()) {
      this.selectBox.focus({ preventScroll: true });
    }
  }

  onDblClick(evnt: MouseEvent) {
    if (this.column.editable) {
      this.edited.setCoord(this.row, this.col);
    }
  }

  isSelected(side: number = 0) {

    if (!this.start.isEmpty() && !this.end.isEmpty()) {
      const sRow: number = (this.start.row < this.end.row) ? this.start.row : this.end.row;
      const sCol: number = (this.start.col < this.end.col) ? this.start.col : this.end.col;
      const eRow: number = (this.start.row > this.end.row) ? this.start.row : this.end.row;
      const eCol: number = (this.start.col > this.end.col) ? this.start.col : this.end.col;

      if ((sRow <= this.row && sCol <= this.col) && (eRow >= this.row && eCol >= this.col)) {
        if (side === 0) {
          return true;
        } else {
          switch (side) {
            case 1: // top
              return (sRow === this.row) ? true : false;
            case 2: // right
              return (eCol === this.col) ? true : false;
            case 3: // bottom
              return (eRow === this.row) ? true : false;
            case 4: // left
              return (sCol === this.col) ? true : false;
          }
        }

      }

    }
    return false;
  }
}
