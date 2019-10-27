import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClsPaginationComponent } from './cls-pagination.component';

describe('ClsPaginationComponent', () => {
  let component: ClsPaginationComponent;
  let fixture: ComponentFixture<ClsPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClsPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClsPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
