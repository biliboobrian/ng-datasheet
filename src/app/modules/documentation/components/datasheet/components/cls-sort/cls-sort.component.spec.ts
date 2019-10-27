import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClsSortComponent } from './cls-sort.component';

describe('ClsSortComponent', () => {
  let component: ClsSortComponent;
  let fixture: ComponentFixture<ClsSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClsSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClsSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
