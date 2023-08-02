import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '@app/data/api/models/pagination/page.model';
import { GiftCertificate } from '@app/data/api/models/gift-certificate.model';
import { SearchState, SearchStore } from '../../search.store';
import { SearchService } from '@app/data/api/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnDestroy {
  state!: SearchState;

  storeSubscription!: Subscription;

  constructor(
    private service: SearchService,
    private store: SearchStore,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.storeSubscription = this.store.state$.subscribe(
      state => (this.state = state)
    );
  }

  onRequireNextData() {
    this.store.patchState({ loading: true });

    this.service
      .search({
        part: this.state.search,
        page: this.state.offset + 1,
        size: this.state.fetchSize,
        sort: this.state.sort,
      })
      .subscribe((data: Page<GiftCertificate>) => {
        this.store.addNextPage(data);
      });
  }

  ngOnDestroy(): void {
    // to clear store since it is lazy loaded singleton actually
    this.store.setInitialState();
    // to clear store subscription
    this.storeSubscription.unsubscribe();
  }
}
