import { TestBed } from '@angular/core/testing';

import { ModalCalificacionGuard } from './modal-calificacion.guard';

describe('ModalCalificacionGuard', () => {
  let guard: ModalCalificacionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ModalCalificacionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
