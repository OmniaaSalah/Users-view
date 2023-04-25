import { TestBed } from '@angular/core/testing';

import { StudentsReportsService } from './students-reports.service';

describe('StudentsReportsService', () => {
  let service: StudentsReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentsReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
