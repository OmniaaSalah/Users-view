import { TestBed } from '@angular/core/testing';

import { CheeckMandatoryServeyGuard } from './cheeck-mandatory-servey.guard';

describe('CheeckMandatoryServeyGuard', () => {
  let guard: CheeckMandatoryServeyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheeckMandatoryServeyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
