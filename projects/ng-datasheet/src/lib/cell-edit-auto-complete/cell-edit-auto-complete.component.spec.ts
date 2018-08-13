import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellEditAutoCompleteComponent } from './cell-edit-auto-complete.component';

describe('CellEditAutoCompleteComponent', () => {
  let component: CellEditAutoCompleteComponent;
  let fixture: ComponentFixture<CellEditAutoCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellEditAutoCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellEditAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
