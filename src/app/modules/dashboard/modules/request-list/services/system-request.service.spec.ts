import { TestBed } from '@angular/core/testing';

import { SystemRequestService } from './system-request.service';

describe('SystemRequestService', () => {
  let service: SystemRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
