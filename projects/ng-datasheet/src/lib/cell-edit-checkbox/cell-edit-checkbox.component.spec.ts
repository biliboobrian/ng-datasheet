import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellEditCheckboxComponent } from './cell-edit-checkbox.component';

describe('CellEditCheckboxComponent', () => {
  let component: CellEditCheckboxComponent;
  let fixture: ComponentFixture<CellEditCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellEditCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellEditCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
