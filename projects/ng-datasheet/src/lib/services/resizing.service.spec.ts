import { TestBed, inject } from '@angular/core/testing';

import { ResizingService } from './resizing.service';

describe('ResizingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResizingService]
    });
  });

  it('should be created', inject([ResizingService], (service: ResizingService) => {
    expect(service).toBeTruthy();
  }));
});
