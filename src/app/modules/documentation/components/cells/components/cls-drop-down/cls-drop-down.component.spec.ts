import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClsDropDownComponent } from './cls-drop-down.component';

describe('ClsDropDownComponent', () => {
  let component: ClsDropDownComponent;
  let fixture: ComponentFixture<ClsDropDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClsDropDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClsDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
