import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, tap } from 'rxjs';
import { Page } from '@app/data/api/models/pagination/page.model';
import { GiftCertificate } from '@app/data/api/models/gift-certificate.model';
import { GiftCertificateService } from '@app/data/api/services/gift-certificate.service';
import { Order } from '@app/data/api/models/pagination/page-request.model';

@Injectable()
export class CertificatePageResolver implements Resolve<Page<GiftCertificate>> {
  constructor(
    private service: GiftCertificateService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Page<GiftCertificate>> {
    let requireRedirect = false;
    let pageIndex: number = Number(route.queryParams['page']) || 0;
    const pageSizes: number[] = route.data['sizes'];
    let pageSize: number = Number(route.queryParams['size']) || pageSizes[0];
    const sort: Order[] = route.data['defaultSort'];

    if (Number.isNaN(pageSize) || !pageSizes.includes(pageSize)) {
      pageSize = pageSizes[0];
      requireRedirect = true;
    }
    if (Number.isNaN(pageIndex) || pageIndex < 0) {
      pageIndex = 0;
      requireRedirect = true;
    }

    if (requireRedirect) {
      console.log('redirect');
      this.redirect(pageIndex, pageSize);
      return EMPTY;
    }

    return this.service
      .getAll({
        page: pageIndex,
        size: pageSize,
        sort: sort,
      })
      .pipe(
        tap(page => {
          if (pageIndex >= page.getTotalPages()) {
            this.redirect(page.getTotalPages() - 1, pageSize);
          }
        })
      );
  }

  private redirect(pageIndex: number, pageSize: number) {
    this.router.navigate(['/certificates'], {
      queryParams: {
        page: pageIndex,
        size: pageSize,
      },
      skipLocationChange: true,
    });
  }
}
