import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClsCellsComponent } from './cls-cells.component';

describe('ClsCellsComponent', () => {
  let component: ClsCellsComponent;
  let fixture: ComponentFixture<ClsCellsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClsCellsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClsCellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
