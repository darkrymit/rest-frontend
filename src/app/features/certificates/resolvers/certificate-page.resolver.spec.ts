import { TestBed } from '@angular/core/testing';

import { CertificatePageResolver } from './certificate-page.resolver';

describe('CertificatePageResolver', () => {
  let resolver: CertificatePageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CertificatePageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
