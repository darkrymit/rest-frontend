import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Cart } from '@client-local/models';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Load Cart': emptyProps(),
    'Load Cart Success': props<{ cart: Cart }>(),
    'Load Cart Failure': props<{ error: any }>(),
    'Process Item Already In Cart': props<{ certificateId: number }>(),
    'Add Item To Cart': props<{ certificateId: number }>(),
    'Add Item To Cart Success': props<{ cart: Cart }>(),
    'Add Item To Cart Failure': props<{ error: any }>(),
    'Update Item Quantity': props<{
      certificateId: number;
      quantity: number;
    }>(),
    'Update Item Quantity Success': props<{ cart: Cart }>(),
    'Update Item Quantity Failure': props<{ error: any }>(),
    'Remove Item From Cart': props<{ certificateId: number }>(),
    'Remove Item From Cart Success': props<{ cart: Cart }>(),
    'Remove Item From Cart Failure': props<{ error: any }>(),
    'Clear Cart': emptyProps(),
    'Clear Cart Success': props<{ cart: Cart }>(),
    'Clear Cart Failure': props<{ error: any }>(),
  },
});
