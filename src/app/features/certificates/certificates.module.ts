import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificatesRoutingModule } from './certificates-routing.module';
import { DetailedComponent } from './pages/detailed/detailed.component';
import { AllComponent } from './pages/all/all.component';
import { SharedModule } from '@shared/shared.module';
import { CertificateResolver } from './resolvers/certificate.resolver';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CertificatePageResolver } from './resolvers/certificate-page.resolver';
import { CertificateFullComponent } from '@features/certificates/component/certificate-full/certificate-full.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddComponent } from './pages/add/add.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DetailedComponent,
    AllComponent,
    CertificateFullComponent,
    AddComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CertificatesRoutingModule,
    MatPaginatorModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [CertificateResolver, CertificatePageResolver],
})
export class CertificatesModule {}
