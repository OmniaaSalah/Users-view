import { TestBed } from '@angular/core/testing';

import { DegreeReportService } from './degree-report.service';

describe('DegreeReportService', () => {
  let service: DegreeReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DegreeReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
