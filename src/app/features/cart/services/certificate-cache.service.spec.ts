import { TestBed } from '@angular/core/testing';

import { CertificateCacheService } from './certificate-cache.service';

describe('CertificateCachedResponceService', () => {
  let service: CertificateCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CertificateCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
