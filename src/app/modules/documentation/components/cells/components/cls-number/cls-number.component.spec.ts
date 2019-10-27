import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClsNumberComponent } from './cls-number.component';

describe('ClsNumberComponent', () => {
  let component: ClsNumberComponent;
  let fixture: ComponentFixture<ClsNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClsNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClsNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
