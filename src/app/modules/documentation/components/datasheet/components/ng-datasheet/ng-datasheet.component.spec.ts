import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDatasheetComponent } from './ng-datasheet.component';

describe('NgDatasheetComponent', () => {
  let component: NgDatasheetComponent;
  let fixture: ComponentFixture<NgDatasheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgDatasheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgDatasheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
