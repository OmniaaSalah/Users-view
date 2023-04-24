import { TestBed } from '@angular/core/testing';

import { SchoolsReportsService } from './schools-reports.service';

describe('SchoolsReportsService', () => {
  let service: SchoolsReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolsReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
