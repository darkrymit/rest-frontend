import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificateMiniCardComponent } from './components/certificate-mini-card/certificate-mini-card.component';
import { InfiniteListComponent } from './components/infinite-list/infinite-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InfiniteListItemDirective } from './components/infinite-list/infinite-list-item.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CertificateMiniSmartCardComponent } from './components/certificate-mini-smart-card/certificate-mini-smart-card.component';
import { LongClickDirective } from './directives/long-click.directive';

@NgModule({
  declarations: [
    CertificateMiniSmartCardComponent,
    CertificateMiniCardComponent,
    InfiniteListComponent,
    InfiniteListItemDirective,
    LongClickDirective,
  ],
  exports: [
    InfiniteListComponent,
    InfiniteListItemDirective,
    CertificateMiniCardComponent,
    CertificateMiniSmartCardComponent,
    LongClickDirective,
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    RouterLink,
  ],
})
export class SharedModule {}
