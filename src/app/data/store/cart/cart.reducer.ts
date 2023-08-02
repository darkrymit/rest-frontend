import { createFeature, createReducer, on } from '@ngrx/store';
import { CartState, initialCartState } from '@store/cart/cart.state';
import { CartActions } from '@store/cart/cart.actions';

export const CartFeature = createFeature({
  name: 'cart',
  reducer: createReducer(
    initialCartState,
    on(
      CartActions.loadCart,
      (state): CartState => ({
        ...state,
        loading: true,
      })
    ),
    on(
      CartActions.loadCartSuccess,
      (state, { cart }): CartState => ({
        ...state,
        data: cart,
        loading: false,
      })
    ),
    on(
      CartActions.loadCartFailure,
      (state, { error }): CartState => ({
        ...state,
        error,
        loading: false,
      })
    ),

    on(
      CartActions.addItemToCartSuccess,
      (state, { cart }): CartState => ({
        ...state,
        data: cart,
      })
    ),
    on(
      CartActions.addItemToCartFailure,
      (state, { error }): CartState => ({
        ...state,
        error,
      })
    ),

    on(
      CartActions.updateItemQuantitySuccess,
      (state, { cart }): CartState => ({
        ...state,
        data: cart,
        loading: false,
      })
    ),
    on(
      CartActions.updateItemQuantityFailure,
      (state, { error }): CartState => ({
        ...state,
        error,
        loading: false,
      })
    ),

    on(
      CartActions.removeItemFromCartSuccess,
      (state, { cart }): CartState => ({
        ...state,
        data: cart,
        loading: false,
      })
    ),
    on(
      CartActions.removeItemFromCartFailure,
      (state, { error }): CartState => ({
        ...state,
        error,
        loading: false,
      })
    ),

    on(
      CartActions.clearCartSuccess,
      (state, { cart }): CartState => ({
        ...state,
        data: cart,
        loading: false,
      })
    ),
    on(
      CartActions.clearCartFailure,
      (state, { error }): CartState => ({
        ...state,
        error,
        loading: false,
      })
    )
  ),
});
