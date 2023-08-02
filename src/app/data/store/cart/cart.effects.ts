import { Injectable } from '@angular/core';
import { CartService, ItemAlreadyInCartError } from '@client-local/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartActions } from '@store/cart/cart.actions';
import { catchError, exhaustMap, filter, map, of, tap } from 'rxjs';
import { Cart } from '@client-local/models';
import { Router } from '@angular/router';

@Injectable()
export class CartEffects {
  loadCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartActions.loadCart),
      exhaustMap(() =>
        this.cartService.getOrCreateCart().pipe(
          map((cart: Cart) => CartActions.loadCartSuccess({ cart })),
          catchError((error: any) => of(CartActions.loadCartFailure({ error })))
        )
      )
    );
  });

  addItemToCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartActions.addItemToCart),
      exhaustMap(({ certificateId }) =>
        this.cartService.addItemToCart(certificateId).pipe(
          map((cart: Cart) => CartActions.addItemToCartSuccess({ cart })),
          catchError((error: any) =>
            of(CartActions.addItemToCartFailure({ error }))
          )
        )
      )
    );
  });

  updateItemQuantity$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartActions.updateItemQuantity),
      exhaustMap(({ certificateId, quantity }) =>
        this.cartService.updateItemQuantity(certificateId, quantity).pipe(
          map((cart: Cart) => CartActions.updateItemQuantitySuccess({ cart })),
          catchError((error: any) =>
            of(CartActions.updateItemQuantityFailure({ error }))
          )
        )
      )
    );
  });

  removeItemFromCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartActions.removeItemFromCart),
      exhaustMap(({ certificateId }) =>
        this.cartService.removeItemFromCart(certificateId).pipe(
          map((cart: Cart) => CartActions.removeItemFromCartSuccess({ cart })),
          catchError((error: any) =>
            of(CartActions.removeItemFromCartFailure({ error }))
          )
        )
      )
    );
  });

  clearCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartActions.clearCart),
      exhaustMap(() =>
        this.cartService.clearCart().pipe(
          map((cart: Cart) => CartActions.clearCartSuccess({ cart })),
          catchError((error: any) =>
            of(CartActions.clearCartFailure({ error }))
          )
        )
      )
    );
  });

  processItemAlreadyInCart$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          CartActions.processItemAlreadyInCart,
          CartActions.loadCartFailure
        ),
        filter(action => {
          if (action.type === CartActions.processItemAlreadyInCart.type) {
            return true;
          }
          if (action.type === CartActions.loadCartFailure.type) {
            if (action.error instanceof ItemAlreadyInCartError) {
              return true;
            }
          }
          return false;
        }),
        tap(() => this.router.navigate(['/cart']))
      );
    },
    { dispatch: false }
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private cartService: CartService
  ) {}
}
