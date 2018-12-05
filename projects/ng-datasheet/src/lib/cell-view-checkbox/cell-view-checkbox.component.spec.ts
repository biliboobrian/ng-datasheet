import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellViewCheckboxComponent } from './cell-view-checkbox.component';

describe('CellViewCheckboxComponent', () => {
  let component: CellViewCheckboxComponent;
  let fixture: ComponentFixture<CellViewCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellViewCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellViewCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
