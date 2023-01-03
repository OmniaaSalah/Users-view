import { TestBed } from '@angular/core/testing';

import { ReportsManagmentService } from './reports-managment.service';

describe('ReportsManagmentService', () => {
  let service: ReportsManagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportsManagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
