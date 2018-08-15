import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellViewLinkComponent } from './cell-view-link.component';

describe('CellViewLinkComponent', () => {
  let component: CellViewLinkComponent;
  let fixture: ComponentFixture<CellViewLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellViewLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellViewLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
