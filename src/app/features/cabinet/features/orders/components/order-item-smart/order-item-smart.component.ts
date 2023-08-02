import { Component, Input, OnInit } from '@angular/core';
import { GiftCertificate, OrderItem } from '@api/models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CertificatesActions, CertificatesQuery } from '@store/certificates';

@Component({
  selector: 'app-order-item-smart',
  templateUrl: './order-item-smart.component.html',
  styleUrls: ['./order-item-smart.component.scss'],
})
export class OrderItemSmartComponent implements OnInit {
  @Input() orderItem!: OrderItem;

  certificate$!: Observable<GiftCertificate>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.certificate$ = CertificatesQuery.factories.certificateData$(
      this.store,
      this.orderItem.giftCertificateId
    );
    this.store.dispatch(
      CertificatesActions.loadCertificateById({
        id: this.orderItem.giftCertificateId,
      })
    );
  }
}
