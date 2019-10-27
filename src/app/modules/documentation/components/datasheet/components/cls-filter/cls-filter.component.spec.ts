import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClsFilterComponent } from './cls-filter.component';

describe('ClsFilterComponent', () => {
  let component: ClsFilterComponent;
  let fixture: ComponentFixture<ClsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
