import { Component } from '@angular/core';

import { distinctUntilChanged, filter, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { CartActions, CartQuery } from '@store/cart';
import { Cart } from '@client-local/models';
import { Item, OrderService } from '@api/services';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { isAuthenticated$ } from '@shared/utils/auth';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.scss'],
})
export class DetailedComponent {
  cart$!: Observable<Cart>;

  isAuthenticated$ = isAuthenticated$(this.oidcSecurityService);

  isAuthenticated = false;

  constructor(
    private store: Store,
    private orderService: OrderService,
    private router: Router,
    private oidcSecurityService: OidcSecurityService
  ) {
    this.cart$ = this.store.pipe(
      select(CartQuery.selectData),
      filter((cart): cart is Cart => !!cart),
      distinctUntilChanged()
    );
    this.isAuthenticated$.subscribe(result => {
      this.isAuthenticated = result;
    });
  }

  onCartCheckout(cart: Cart) {
    if (!this.isAuthenticated) {
      this.oidcSecurityService
        .authorizeWithPopUp(undefined, undefined, 'main-oidc')
        .subscribe();
      return;
    }
    let items: Item[] = cart.items.map(item => {
      return {
        id: item.certificateId,
        quantity: item.quantity,
      };
    });
    this.orderService.create({ items }).subscribe(order => {
      this.store.dispatch(CartActions.clearCart());
      let totalPrice = order.items.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
      this.router.navigate(['/orders/success'], {
        state: {
          orderState: {
            id: order.id,
            totalPrice: totalPrice,
          },
        },
      });
    });
  }
}
