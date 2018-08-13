import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellEditDateComponent } from './cell-edit-date.component';

describe('CellEditDateComponent', () => {
  let component: CellEditDateComponent;
  let fixture: ComponentFixture<CellEditDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellEditDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellEditDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
