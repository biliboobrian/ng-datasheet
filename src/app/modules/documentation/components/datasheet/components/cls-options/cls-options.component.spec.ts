import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClsOptionsComponent } from './cls-options.component';

describe('ClsOptionsComponent', () => {
  let component: ClsOptionsComponent;
  let fixture: ComponentFixture<ClsOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClsOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClsOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
