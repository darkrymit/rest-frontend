import { Cart } from '@client-local/models';

export interface CartState {
  data: Cart | null;
  loading: boolean;
  error: any;
}

export const initialCartState: CartState = {
  data: null,
  loading: false,
  error: null,
};
