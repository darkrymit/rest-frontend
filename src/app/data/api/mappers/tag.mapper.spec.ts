import { TestBed } from '@angular/core/testing';

import { TagMapper } from './tag.mapper';

describe('TagMapperService', () => {
  let service: TagMapper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagMapper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
