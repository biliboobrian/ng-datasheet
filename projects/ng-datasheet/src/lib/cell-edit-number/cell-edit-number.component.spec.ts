import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellEditNumberComponent } from './cell-edit-number.component';

describe('CellEditNumberComponent', () => {
  let component: CellEditNumberComponent;
  let fixture: ComponentFixture<CellEditNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellEditNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellEditNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
