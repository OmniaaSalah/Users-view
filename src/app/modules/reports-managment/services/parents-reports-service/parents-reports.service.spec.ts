import { TestBed } from '@angular/core/testing';

import { ParentsReportsService } from './parents-reports.service';

describe('ParentsReportsServiceService', () => {
  let service: ParentsReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParentsReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
