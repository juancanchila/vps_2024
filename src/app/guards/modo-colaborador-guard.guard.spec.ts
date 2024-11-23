import { TestBed } from '@angular/core/testing';

import { ModoColaboradorGuardGuard } from './modo-colaborador-guard.guard';

describe('ModoColaboradorGuardGuard', () => {
  let guard: ModoColaboradorGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ModoColaboradorGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
