import { TestBed } from '@angular/core/testing';

import { OrderMapper } from './order.mapper';

describe('OrderMapper', () => {
  let service: OrderMapper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderMapper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
