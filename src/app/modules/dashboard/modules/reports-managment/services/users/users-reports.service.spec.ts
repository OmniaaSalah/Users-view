import { TestBed } from '@angular/core/testing';

import { UsersReportsService } from './users-reports.service';

describe('UsersReportsService', () => {
  let service: UsersReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
