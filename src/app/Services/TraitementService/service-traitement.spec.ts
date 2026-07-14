import { TestBed } from '@angular/core/testing';

import { ServiceTraitement } from './service-traitement';

describe('ServiceTraitement', () => {
  let service: ServiceTraitement;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTraitement);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
