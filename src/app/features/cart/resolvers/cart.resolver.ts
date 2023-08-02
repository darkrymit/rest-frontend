import { ResolveFn } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { inject } from '@angular/core';
import { CartActions, CartQuery } from '@store/cart';
import { filter, take } from 'rxjs';

export const cartResolver: ResolveFn<boolean> = (route, state) => {
  const store = inject(Store);
  store.dispatch(CartActions.loadCart());

  return store.pipe(
    select(CartQuery.selectLoading),
    filter(loading => !loading),
    take(1)
  );
};
