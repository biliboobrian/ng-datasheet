import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClsObjectComponent } from './cls-object.component';

describe('ClsObjectComponent', () => {
  let component: ClsObjectComponent;
  let fixture: ComponentFixture<ClsObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClsObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClsObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
