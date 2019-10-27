import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClsCheckboxComponent } from './cls-checkbox.component';

describe('ClsCheckboxComponent', () => {
  let component: ClsCheckboxComponent;
  let fixture: ComponentFixture<ClsCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClsCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClsCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
