import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClsAutoCompleteComponent } from './cls-auto-complete.component';

describe('ClsAutoCompleteComponent', () => {
  let component: ClsAutoCompleteComponent;
  let fixture: ComponentFixture<ClsAutoCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClsAutoCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClsAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
