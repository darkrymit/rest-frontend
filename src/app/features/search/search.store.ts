import { Injectable, OnDestroy } from '@angular/core';
import { GiftCertificate } from '@app/data/api/models/gift-certificate.model';
import { ComponentStore } from '@ngrx/component-store';
import { Page } from '@app/data/api/models/pagination/page.model';
import { Order } from '@app/data/api/models/pagination/page-request.model';

export interface SearchState {
  search: string;
  data: GiftCertificate[];
  initialLoading: boolean;
  loading: boolean;
  empty: boolean;
  last: boolean;
  offset: number;
  count: number;
  fetchSize: number;
  sort: Order[];
}

export const INITIAL_STATE: SearchState = {
  search: '',
  data: [],
  empty: false,
  initialLoading: true,
  last: false,
  offset: -1,
  loading: true,
  count: 0,
  fetchSize: 10,
  sort: [{ property: 'name', direction: 'ASC' }],
};

@Injectable()
export class SearchStore
  extends ComponentStore<SearchState>
  implements OnDestroy
{
  addNextPage: (page: Page<GiftCertificate>) => any = this.updater(
    (state: SearchState, page: Page<GiftCertificate>): SearchState => {
      return {
        ...state,
        data: [...state.data, ...page.content],
        initialLoading: false,
        loading: false,
        offset: page.getNumber(),
        last: page.isLast(),
        count: page.getTotalElements(),
        empty: page.getTotalElements() == 0,
      };
    }
  );

  constructor() {
    super(INITIAL_STATE);
  }

  setInitialState() {
    this.setState(INITIAL_STATE);
  }

  override ngOnDestroy(): void {
    console.log('SearchStore destroyed');
    super.ngOnDestroy();
  }
}
