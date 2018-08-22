import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalMenuComponent } from './global-menu.component';

describe('GlobalMenuComponent', () => {
  let component: GlobalMenuComponent;
  let fixture: ComponentFixture<GlobalMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
