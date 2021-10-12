import { TestBed } from '@angular/core/testing';

import { VehicleCompanyService } from './vehicle-company.service';

describe('VehicleCompanyService', () => {
  let service: VehicleCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
