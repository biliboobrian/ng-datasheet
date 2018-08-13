import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellViewObjectComponent } from './cell-view-object.component';

describe('CellViewObjectComponent', () => {
  let component: CellViewObjectComponent;
  let fixture: ComponentFixture<CellViewObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellViewObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellViewObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
