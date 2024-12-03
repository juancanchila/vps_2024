import { TestBed } from '@angular/core/testing';

import { DisponibilidadGuard } from './disponibilidad.guard';

describe('DisponibilidadGuard', () => {
  let guard: DisponibilidadGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DisponibilidadGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
