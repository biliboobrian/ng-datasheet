import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClsButtonComponent } from './cls-button.component';

describe('ClsButtonComponent', () => {
  let component: ClsButtonComponent;
  let fixture: ComponentFixture<ClsButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClsButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
