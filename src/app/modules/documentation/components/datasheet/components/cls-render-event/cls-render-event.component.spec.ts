import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClsRenderEventComponent } from './cls-render-event.component';

describe('ClsRenderEventComponent', () => {
  let component: ClsRenderEventComponent;
  let fixture: ComponentFixture<ClsRenderEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClsRenderEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClsRenderEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
