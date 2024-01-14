import { TestBed } from '@angular/core/testing';

import { GeolocationsService } from './geolocations.service';

describe('GeolocationsService', () => {
  let service: GeolocationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeolocationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
