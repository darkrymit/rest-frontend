export const EMPTY_CART: Cart = {
  items: [],
};

export interface CartItem {
  certificateId: number;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}
