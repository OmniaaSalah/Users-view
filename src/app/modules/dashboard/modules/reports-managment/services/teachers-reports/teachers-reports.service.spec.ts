import { TestBed } from '@angular/core/testing';

import { TeachersReportsService } from './teachers-reports.service';

describe('TeachersReportsService', () => {
  let service: TeachersReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeachersReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
