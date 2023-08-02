import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GiftCertificate } from '@api/models';

@Component({
  selector: 'app-certificate-full',
  templateUrl: './certificate-full.component.html',
  styleUrls: ['./certificate-full.component.scss'],
})
export class CertificateFullComponent {
  @Input()
  data!: GiftCertificate;

  @Input()
  inCart = false;

  @Output()
  addToCart = new EventEmitter<GiftCertificate>();

  @Output()
  alreadyInCart = new EventEmitter<GiftCertificate>();

  onAddToCart() {
    this.addToCart.emit(this.data);
  }

  onAlreadyInCart() {
    this.alreadyInCart.emit(this.data);
  }
}
