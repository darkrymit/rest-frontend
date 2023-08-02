import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Cart, CartItem } from '@client-local/models';
import { GiftCertificate } from '@api/models';

@Component({
  selector: 'app-cart-full',
  templateUrl: './cart-full.component.html',
  styleUrls: ['./cart-full.component.scss'],
})
export class CartFullComponent {
  totalPrice: number = 0;

  _cart!: Cart;

  get cart(): Cart {
    return this._cart;
  }

  @Input() set cart(value: Cart) {
    this._cart = value;
    this.totalPrice = 0;
  }

  @Output() cartCheckout: EventEmitter<Cart> = new EventEmitter<Cart>();

  constructor(private cd: ChangeDetectorRef) {}

  onItemFullyLoaded(price: {
    cartItem: CartItem;
    certificate: GiftCertificate;
  }) {
    this.totalPrice += price.cartItem.quantity * price.certificate.price;
    this.cd.detectChanges();
  }

  isCartEmpty() {
    return this.cart.items.length === 0;
  }

  onCheckout() {
    this.cartCheckout.emit(this.cart);
  }
}
