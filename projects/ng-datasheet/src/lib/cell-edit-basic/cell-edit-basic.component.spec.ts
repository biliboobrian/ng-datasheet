import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellEditBasicComponent } from './cell-edit-basic.component';

describe('CellEditBasicComponent', () => {
  let component: CellEditBasicComponent;
  let fixture: ComponentFixture<CellEditBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellEditBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellEditBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
