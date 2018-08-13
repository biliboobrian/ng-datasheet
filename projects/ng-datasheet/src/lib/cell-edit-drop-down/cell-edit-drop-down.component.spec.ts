import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellEditDropDownComponent } from './cell-edit-drop-down.component';

describe('CellEditDropDownComponent', () => {
  let component: CellEditDropDownComponent;
  let fixture: ComponentFixture<CellEditDropDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellEditDropDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellEditDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
