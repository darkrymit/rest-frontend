import { Component, Input } from '@angular/core';
import { GiftCertificate, OrderItem } from '@api/models';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent {
  @Input() orderItem!: OrderItem;

  @Input() certificate!: GiftCertificate;
}
