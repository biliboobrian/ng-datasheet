import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellViewNumberComponent } from './cell-view-number.component';

describe('CellViewNumberComponent', () => {
  let component: CellViewNumberComponent;
  let fixture: ComponentFixture<CellViewNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellViewNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellViewNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
