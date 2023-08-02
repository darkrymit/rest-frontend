import { Component } from '@angular/core';
import { GiftCertificate } from '@app/data/api/models/gift-certificate.model';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { CartQuery } from '@app/data/store/cart/cart.selectors';
import { CartActions } from '@store/cart';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.scss'],
})
export class DetailedComponent {
  certificate$: Observable<GiftCertificate>;
  isInCart$!: Observable<boolean>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) {
    this.certificate$ = this.activatedRoute.data.pipe(
      map(data => data['certificate'])
    );

    this.isInCart$ = this.certificate$.pipe(
      filter(certificate => !!certificate),
      switchMap(certificate =>
        store.pipe(select(CartQuery.selectIsItemInCart(certificate.id)))
      )
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
