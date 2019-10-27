import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClsBasicComponent } from './cls-basic.component';

describe('ClsBasicComponent', () => {
  let component: ClsBasicComponent;
  let fixture: ComponentFixture<ClsBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClsBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClsBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
