import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GiftCertificate } from '@app/data/api/models/gift-certificate.model';

@Component({
  selector: 'app-certificate-mini-card',
  templateUrl: './certificate-mini-card.component.html',
  styleUrls: ['./certificate-mini-card.component.scss'],
})
export class CertificateMiniCardComponent implements OnInit {
  @Input()
  data!: GiftCertificate;

  @Input()
  maxImageWidth!: string;

  @Input()
  inCart = false;

  @Output()
  addToCart = new EventEmitter<GiftCertificate>();

  @Output()
  alreadyInCart = new EventEmitter<GiftCertificate>();

  ngOnInit(): void {
    this.maxImageWidth = this.maxImageWidth || '100%';
  }

  onAddToCart() {
    this.addToCart.emit(this.data);
  }

  onAlreadyInCart() {
    this.alreadyInCart.emit(this.data);
  }
}
