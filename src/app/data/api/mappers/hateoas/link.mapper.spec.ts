import { TestBed } from '@angular/core/testing';

import { LinkMapper } from './link.mapper';

describe('LinkMapper', () => {
  let service: LinkMapper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkMapper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
