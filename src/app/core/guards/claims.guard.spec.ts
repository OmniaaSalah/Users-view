import { TestBed } from '@angular/core/testing';

import { ClaimsGuard } from './claims.guard';

describe('ClaimsGuard', () => {
  let guard: ClaimsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ClaimsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
