import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './pages/search/search.component';
import { SharedModule } from '../../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SearchStore } from './search.store';
import { SearchResolver } from './search.resolver';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SharedModule,
    SearchRoutingModule,
    MatProgressSpinnerModule,
  ],
  providers: [SearchStore, SearchResolver],
})
export class SearchModule {}
