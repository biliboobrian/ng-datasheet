import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellViewButtonComponent } from './cell-view-button.component';

describe('CellViewButtonComponent', () => {
  let component: CellViewButtonComponent;
  let fixture: ComponentFixture<CellViewButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellViewButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellViewButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
