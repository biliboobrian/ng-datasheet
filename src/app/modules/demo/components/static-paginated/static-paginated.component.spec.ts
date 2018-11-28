import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticPaginatedComponent } from './static-paginated.component';

describe('StaticPaginatedComponent', () => {
  let component: StaticPaginatedComponent;
  let fixture: ComponentFixture<StaticPaginatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticPaginatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticPaginatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
