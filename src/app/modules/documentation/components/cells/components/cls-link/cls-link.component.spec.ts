import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClsLinkComponent } from './cls-link.component';

describe('ClsLinkComponent', () => {
  let component: ClsLinkComponent;
  let fixture: ComponentFixture<ClsLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClsLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClsLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
