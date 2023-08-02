import { Component, Input, OnInit } from '@angular/core';
import { GiftCertificate } from '@api/models';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { CartActions, CartQuery } from '@store/cart';

@Component({
  selector: 'app-certificate-mini-smart',
  templateUrl: './certificate-mini-smart-card.component.html',
  styleUrls: ['./certificate-mini-smart-card.component.scss'],
})
export class CertificateMiniSmartCardComponent implements OnInit {
  @Input() data!: GiftCertificate;

  @Input() maxImageWidth!: string;

  isInCart$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.maxImageWidth = this.maxImageWidth || '100%';
    this.isInCart$ = this.store.pipe(
      select(CartQuery.selectIsItemInCart(this.data.id))
    );
  }

  onAddToCart(certificate: GiftCertificate) {
    this.store.dispatch(
      CartActions.addItemToCart({ certificateId: certificate.id })
    );
  }

  onAlreadyInCart(certificate: GiftCertificate) {
    this.store.dispatch(
      CartActions.processItemAlreadyInCart({ certificateId: certificate.id })
    );
  }
}
