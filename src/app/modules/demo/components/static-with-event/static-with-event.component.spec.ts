import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticWithEventComponent } from './static-with-event.component';

describe('StaticWithEventComponent', () => {
  let component: StaticWithEventComponent;
  let fixture: ComponentFixture<StaticWithEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticWithEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticWithEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
