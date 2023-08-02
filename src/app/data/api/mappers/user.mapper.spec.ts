import { TestBed } from '@angular/core/testing';

import { UserMapper } from './user.mapper';

describe('UserMapper', () => {
  let service: UserMapper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMapper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
