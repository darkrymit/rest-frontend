import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, map, Observable, switchMap, tap } from 'rxjs';
import { Page, Order } from '@app/data/api/models/pagination';
import { UserService } from '@api/services';
import { Order as AppOrder } from '@api/models';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable()
export class OrdersPageResolver implements Resolve<Page<AppOrder>> {
  constructor(
    private service: UserService,
    private oidcSecurityService: OidcSecurityService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Page<AppOrder>> {
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

    return this.oidcSecurityService.getPayloadFromAccessToken().pipe(
      map((payload: any) => {
        return payload.sub;
      }),
      switchMap((userId: string) => {
        return this.service
          .getOrders(userId, {
            page: pageIndex,
            size: pageSize,
            sort: sort,
          })
          .pipe(
            tap(page => {
              if (
                pageIndex >= page.getTotalPages() &&
                page.getTotalPages() > 0
              ) {
                this.redirect(page.getTotalPages() - 1, pageSize);
              }
            })
          );
      })
    );
  }

  private redirect(pageIndex: number, pageSize: number) {
    console.log('redirect');
    this.router.navigate(['orders'], {
      queryParams: {
        page: pageIndex,
        size: pageSize,
      },
      skipLocationChange: true,
    });
  }
}
