import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClsDateComponent } from './cls-date.component';

describe('ClsDateComponent', () => {
  let component: ClsDateComponent;
  let fixture: ComponentFixture<ClsDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClsDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClsDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
