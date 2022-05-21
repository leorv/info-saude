import { TestBed } from '@angular/core/testing';

import { VaccinesTakenService } from './vaccines-taken.service';

describe('VaccinesTakenService', () => {
  let service: VaccinesTakenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccinesTakenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
