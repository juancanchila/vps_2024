import { TestBed } from '@angular/core/testing';

import { AuxiliarGuard } from './auxiliar.guard';

describe('AuxiliarGuard', () => {
  let guard: AuxiliarGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuxiliarGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
