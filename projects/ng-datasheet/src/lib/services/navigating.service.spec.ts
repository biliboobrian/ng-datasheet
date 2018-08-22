import { TestBed, inject } from '@angular/core/testing';

import { NavigatingService } from './navigating.service';

describe('NavigatingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigatingService]
    });
  });

  it('should be created', inject([NavigatingService], (service: NavigatingService) => {
    expect(service).toBeTruthy();
  }));
});
