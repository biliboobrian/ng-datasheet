import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticEditableComponent } from './static-editable.component';

describe('StaticEditableComponent', () => {
  let component: StaticEditableComponent;
  let fixture: ComponentFixture<StaticEditableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticEditableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
