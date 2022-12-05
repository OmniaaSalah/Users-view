import { TestBed } from '@angular/core/testing';

import { ParentRequestService } from './parent-request.service';

describe('ParentRequestService', () => {
  let service: ParentRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParentRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
