import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClsColumnComponent } from './cls-column.component';

describe('ClsColumnComponent', () => {
  let component: ClsColumnComponent;
  let fixture: ComponentFixture<ClsColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClsColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClsColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
