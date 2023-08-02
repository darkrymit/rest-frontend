import { Inject, Injectable, InjectionToken } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cart, EMPTY_CART } from '@app/data/client-local/models/cart.model';

export const CART_STORAGE_TOKEN = new InjectionToken<Storage>(
  'CART_STORAGE_TOKEN',
  {
    providedIn: 'root',
    factory: () => localStorage,
  }
);

export class ItemAlreadyInCartError extends Error {
  constructor(id: number) {
    super(`Item ${id} already exists in cart`);
    this.name = this.constructor.name;
  }
}

export class ItemNotInCartError extends Error {
  constructor(id: number) {
    super(`Item ${id} not exists in cart`);
    this.name = this.constructor.name;
  }
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(@Inject(CART_STORAGE_TOKEN) private storage: Storage) {}

  /**
   *  Get cart from storage or create new one if not exists
   *  @return {Observable<Cart>} cart observable
   */
  getOrCreateCart(): Observable<Cart> {
    return new Observable<Cart>(subscriber => {
      const cartJSON = this.storage.getItem('cart');
      let cart: Cart;
      if (cartJSON) {
        // get cart from storage
        cart = JSON.parse(cartJSON);
      } else {
        // get empty cart
        cart = EMPTY_CART;
        this.storage.setItem('cart', JSON.stringify(cart));
      }
      subscriber.next(cart);
      subscriber.complete();
    });
  }

  /**
   * Add item to cart by certificateId or throw error in observable if item already exists
   * @param certificateId {number} item certificateId
   * @return {Observable<Cart>} updated cart observable
   */
  addItemToCart(certificateId: number): Observable<Cart> {
    return this.getOrCreateCart().pipe(
      map(cart => {
        // search for item in cart
        const itemIndex = cart.items.findIndex(
          item => item.certificateId === certificateId
        );
        if (itemIndex !== -1) {
          throw new Error('Item already exists in cart');
        }
        cart.items.push({ certificateId: certificateId, quantity: 1 });
        this.saveCartToStorage(cart);
        return cart;
      })
    );
  }

  /**
   * Update item quantity in cart by certificateId or throw error in observable if item not found
   * @param certificateId {number} item certificateId
   * @param quantity {number} new quantity
   * @return {Observable<Cart>} updated cart observable
   */
  updateItemQuantity(
    certificateId: number,
    quantity: number
  ): Observable<Cart> {
    return this.getOrCreateCart().pipe(
      map(cart => {
        const itemIndex = cart.items.findIndex(
          item => item.certificateId === certificateId
        );
        if (itemIndex === -1) {
          throw new ItemAlreadyInCartError(certificateId);
        }
        cart.items[itemIndex].quantity = quantity;
        this.saveCartToStorage(cart);
        return cart;
      })
    );
  }

  /**
   * Remove item from cart by certificateId or throw error in observable if item not found
   * @param certificateId {number} certificate id
   * @return {Observable<Cart>} updated cart observable
   */
  removeItemFromCart(certificateId: number): Observable<Cart> {
    return this.getOrCreateCart().pipe(
      map(cart => {
        const itemIndex = cart.items.findIndex(
          item => item.certificateId === certificateId
        );
        if (itemIndex === -1) {
          throw new ItemNotInCartError(certificateId);
        }
        cart.items.splice(itemIndex, 1);
        this.saveCartToStorage(cart);
        return cart;
      })
    );
  }

  /**
   * Set cart state to empty
   * @return {Observable<Cart>} updated cart observable
   */
  clearCart(): Observable<Cart> {
    return new Observable<Cart>(subscriber => {
      this.saveCartToStorage(EMPTY_CART);
      subscriber.next(EMPTY_CART);
      subscriber.complete();
    });
  }

  private saveCartToStorage(cart: Cart) {
    this.storage.setItem('cart', JSON.stringify(cart));
  }
}
