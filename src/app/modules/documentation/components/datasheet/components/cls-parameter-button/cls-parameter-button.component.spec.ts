import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClsParameterButtonComponent } from './cls-parameter-button.component';

describe('ClsParameterButtonComponent', () => {
  let component: ClsParameterButtonComponent;
  let fixture: ComponentFixture<ClsParameterButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClsParameterButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClsParameterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
