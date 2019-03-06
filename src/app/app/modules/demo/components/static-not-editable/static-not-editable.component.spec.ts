import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticNotEditableComponent } from './static-not-editable.component';

describe('StaticNotEditableComponent', () => {
  let component: StaticNotEditableComponent;
  let fixture: ComponentFixture<StaticNotEditableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticNotEditableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticNotEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
