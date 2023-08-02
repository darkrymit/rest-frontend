import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable, switchMap, take } from 'rxjs';
import { SearchService } from '@app/data/api/services/search.service';
import { SearchStore } from './search.store';

@Injectable()
export class SearchResolver implements Resolve<boolean> {
  constructor(
    private service: SearchService,
    private store: SearchStore
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    this.store.setInitialState();
    const search = route.queryParamMap.get('search') || '';
    this.store.patchState({ search: search });

    return this.store.state$.pipe(
      take(1),
      switchMap(state => {
        return this.service.search({
          part: state.search,
          page: state.offset + 1,
          size: state.fetchSize,
          sort: state.sort,
        });
      }),
      map(data => {
        this.store.addNextPage(data);
        return true;
      })
    );
  }
}
