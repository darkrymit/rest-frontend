import { TestBed } from '@angular/core/testing';

import { GiftCertificateMapper } from './gift-certificate.mapper';

describe('GiftCertificateMapper', () => {
  let service: GiftCertificateMapper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiftCertificateMapper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
