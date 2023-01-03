import { TestBed } from '@angular/core/testing';

import { AttendanceReportsServicesService } from './attendance-reports-services.service';

describe('AttendanceReportsServicesService', () => {
  let service: AttendanceReportsServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendanceReportsServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
