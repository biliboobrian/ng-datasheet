import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellViewBasicComponent } from './cell-view-basic.component';

describe('CellViewBasicComponent', () => {
  let component: CellViewBasicComponent;
  let fixture: ComponentFixture<CellViewBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellViewBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellViewBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
