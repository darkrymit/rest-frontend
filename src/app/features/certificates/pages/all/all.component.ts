import { Component, OnDestroy } from '@angular/core';
import { Page } from '@api/models/pagination';
import { GiftCertificate } from '@api/models';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { CartActions, CartQuery } from '@store/cart';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss'],
})
export class AllComponent implements OnDestroy {
  page!: Page<GiftCertificate>;

  pageSizes!: number[];

  dataSubscription!: Subscription;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.dataSubscription = this.activatedRoute.data.subscribe(data => {
      this.page = data['page'];
      this.pageSizes = data['sizes'];
    });
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  onPageChange($event: PageEvent) {
    this.router.navigate(['/certificates'], {
      queryParams: {
        page: $event.pageIndex,
        size: $event.pageSize,
      },
    });
  }
}
