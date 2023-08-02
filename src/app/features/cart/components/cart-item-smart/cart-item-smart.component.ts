import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from '@client-local/models';
import { Observable } from 'rxjs';
import { GiftCertificate } from '@api/models';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { CartActions } from '@store/cart';
import { CertificatesActions, CertificatesQuery } from '@store/certificates';

@UntilDestroy()
@Component({
  selector: 'app-cart-item-smart',
  templateUrl: './cart-item-smart.component.html',
  styleUrls: ['./cart-item-smart.component.scss'],
})
export class CartItemSmartComponent implements OnInit {
  @Input() cartItem!: CartItem;

  certificate$!: Observable<GiftCertificate>;

  @Output() itemFullyLoaded = new EventEmitter<{
    cartItem: CartItem;
    certificate: GiftCertificate;
  }>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.certificate$ = CertificatesQuery.factories.certificateData$(
      this.store,
      this.cartItem.certificateId
    );
    this.certificate$.pipe(untilDestroyed(this)).subscribe(certificate => {
      this.itemFullyLoaded.emit({
        cartItem: this.cartItem,
        certificate,
      });
    });
    this.store.dispatch(
      CertificatesActions.loadCertificateById({
        id: this.cartItem.certificateId,
      })
    );
  }

  onUpdateQuantity(data: { cartItem: CartItem; quantity: number }) {
    this.store.dispatch(
      CartActions.updateItemQuantity({
        certificateId: data.cartItem.certificateId,
        quantity: data.quantity,
      })
    );
  }

  onRemove(data: CartItem) {
    this.store.dispatch(
      CartActions.removeItemFromCart({
        certificateId: data.certificateId,
      })
    );
  }
}
