import { TestBed } from '@angular/core/testing';

import { StudentService } from './register-child.service';

describe('RegisterChildService', () => {
  let service: StudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
