import { TestBed } from '@angular/core/testing';

import { SearchStore } from './search.store';

describe('SearchService', () => {
  let service: SearchStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
