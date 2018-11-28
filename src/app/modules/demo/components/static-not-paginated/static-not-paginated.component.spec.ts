import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticNotPaginatedComponent } from './static-not-paginated.component';

describe('StaticNotPaginatedComponent', () => {
  let component: StaticNotPaginatedComponent;
  let fixture: ComponentFixture<StaticNotPaginatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticNotPaginatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticNotPaginatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
