import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClsDefaultTranslationComponent } from './cls-default-translation.component';

describe('ClsDefaultTranslationComponent', () => {
  let component: ClsDefaultTranslationComponent;
  let fixture: ComponentFixture<ClsDefaultTranslationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClsDefaultTranslationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClsDefaultTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
