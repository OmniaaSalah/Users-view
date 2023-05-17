import { TestBed } from '@angular/core/testing';

import { TransferedStudentsService } from './transfered-students.service';

describe('TransferedStudentsService', () => {
  let service: TransferedStudentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferedStudentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
