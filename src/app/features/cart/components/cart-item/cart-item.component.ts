import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CartItem } from '@client-local/models';
import { GiftCertificate } from '@api/models';
import { UntilDestroy } from '@ngneat/until-destroy';
import { fromEvent } from 'rxjs';
import { LongClickDirective } from '@shared/directives/long-click.directive';

@UntilDestroy()
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {
  @Input() cartItem!: CartItem;
  @Input() certificate!: GiftCertificate;
  @Input('quantity') quantity!: number;

  @Output() updateQuantity = new EventEmitter<{
    cartItem: CartItem;
    quantity: number;
  }>();
  @Output() remove = new EventEmitter<CartItem>();

  constructor(private cd: ChangeDetectorRef) {}

  onIncreaseQuantity() {
    this.quantity++;
  }

  onDecreaseQuantity() {
    const quantity = this.quantity - 1;
    if (quantity > 0) {
      this.quantity = quantity;
      this.emitUpdateQuantity();
    } else {
      // since if quantity is 0, the cart item will be removed
      this.remove.emit(this.cartItem);
    }
  }

  onHoldIncreaseQuantity(tick: number) {
    let increaseQuantity = Math.ceil(tick / 2);
    this.quantity += tick + increaseQuantity;
  }

  onHoldDecreaseQuantity(tick: number) {
    let decreaseQuantity = Math.ceil(tick / 2);
    const quantity = this.quantity - decreaseQuantity;
    if (quantity > 0) {
      this.quantity = quantity;
    } else {
      this.quantity = 1;
    }
  }

  emitUpdateQuantity() {
    this.updateQuantity.emit({
      cartItem: this.cartItem,
      quantity: this.quantity,
    });
  }

  onRemove() {
    this.remove.emit(this.cartItem);
  }
}
