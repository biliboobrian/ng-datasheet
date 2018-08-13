import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellViewDateComponent } from './cell-view-date.component';

describe('CellViewDateComponent', () => {
  let component: CellViewDateComponent;
  let fixture: ComponentFixture<CellViewDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellViewDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellViewDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
