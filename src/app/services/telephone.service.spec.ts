import { TestBed } from '@angular/core/testing';

import { TelephoneService } from './telephone.service';

describe('TelephoneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TelephoneService = TestBed.get(TelephoneService);
    expect(service).toBeTruthy();
  });
});
