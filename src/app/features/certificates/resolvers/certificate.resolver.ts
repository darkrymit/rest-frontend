import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { GiftCertificate } from '@app/data/api/models/gift-certificate.model';
import { GiftCertificateService } from '@app/data/api/services/gift-certificate.service';

@Injectable()
export class CertificateResolver implements Resolve<GiftCertificate> {
  constructor(private service: GiftCertificateService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<GiftCertificate> {
    return this.service.getById(route.params['id']);
  }
}
