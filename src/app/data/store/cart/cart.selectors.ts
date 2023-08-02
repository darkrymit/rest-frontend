import { CartFeature } from '@store/cart/cart.reducer';
import { createSelector } from '@ngrx/store';

const { selectData, selectLoading, selectError } = CartFeature;

const selectCartItemsCount = createSelector(selectData, cart =>
  cart ? cart.items.length : 0
);

const selectIsItemInCart = (id: number) =>
  createSelector(selectData, cart => {
    if (!cart) {
      return false;
    }
    return cart.items.some(item => item.certificateId === id);
  });

export const CartQuery = {
  selectData,
  selectLoading,
  selectError,
  selectCartItemsCount,
  selectIsItemInCart,
};
