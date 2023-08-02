import { Component, Input } from '@angular/core';
import { Order } from '@api/models';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  totalPrice!: number;

  private _order!: Order;

  get order(): Order {
    return this._order;
  }

  @Input() set order(value: Order) {
    this._order = value;
    this.totalPrice = this._order.items.reduce(
      (acc: number, item) => acc + item.price * item.quantity,
      0
    );
  }
}
