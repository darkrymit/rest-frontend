import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './pages/all/all.component';
import { DetailedComponent } from './pages/detailed/detailed.component';
import { CertificateResolver } from './resolvers/certificate.resolver';
import { CertificatePageResolver } from './resolvers/certificate-page.resolver';
import { AddComponent } from '@features/certificates/pages/add/add.component';
import { adminGuard } from '@core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: AllComponent,
    runGuardsAndResolvers: 'always',
    resolve: {
      page: CertificatePageResolver,
    },
    data: {
      sizes: [5, 10, 20],
      defaultSort: [{ property: 'createDate', direction: 'DESC' }],
    },
  },
  {
    path: 'add',
    component: AddComponent,
    canActivate: [adminGuard],
  },
  {
    path: ':id',
    component: DetailedComponent,
    runGuardsAndResolvers: 'always',
    resolve: {
      certificate: CertificateResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CertificatesRoutingModule {}
