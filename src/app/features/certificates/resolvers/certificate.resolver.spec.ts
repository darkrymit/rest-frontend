import { TestBed } from '@angular/core/testing';

import { CertificateResolver } from './certificate.resolver';

describe('CertificateResolver', () => {
  let resolver: CertificateResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CertificateResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
