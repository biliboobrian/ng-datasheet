import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicWithCustomsComponent } from './dynamic-with-customs.component';

describe('DynamicWithCustomsComponent', () => {
  let component: DynamicWithCustomsComponent;
  let fixture: ComponentFixture<DynamicWithCustomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicWithCustomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicWithCustomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
