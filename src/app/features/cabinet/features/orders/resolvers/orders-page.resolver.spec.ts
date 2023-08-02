import { TestBed } from '@angular/core/testing';

import { OrdersPageResolver } from './orders-page.resolver';

describe('CertificatePageResolver', () => {
  let resolver: OrdersPageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(OrdersPageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
