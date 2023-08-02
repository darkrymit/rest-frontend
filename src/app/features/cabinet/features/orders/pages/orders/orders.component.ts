import { Component } from '@angular/core';
import { Page } from '@api/models/pagination';
import { Order } from '@api/models';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@UntilDestroy()
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  page!: Page<Order>;

  pageSizes!: number[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.data.pipe(untilDestroyed(this)).subscribe(data => {
      this.page = data['page'];
      this.pageSizes = data['sizes'];
    });
  }

  onPageChange($event: PageEvent) {
    this.router.navigate(['cabinet', 'orders'], {
      queryParams: {
        page: $event.pageIndex,
        size: $event.pageSize,
      },
    });
  }
}
