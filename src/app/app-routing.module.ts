import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authorizedGuard } from '@core/guards/authorized.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'certificates',
    loadChildren: () =>
      import('./features/certificates/certificates.module').then(
        m => m.CertificatesModule
      ),
  },
  {
    path: 'cabinet',
    loadChildren: () =>
      import('./features/cabinet/cabinet.module').then(m => m.CabinetModule),
    canActivate: [authorizedGuard],
  },
  {
    path: 'contact-us',
    loadChildren: () =>
      import('./features/contact-us/contact-us.module').then(
        m => m.ContactUsModule
      ),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./features/search/search.module').then(m => m.SearchModule),
  },
  {
    path: 'errors/404',
    loadChildren: () =>
      import('./features/not-found/not-found.module').then(
        m => m.NotFoundModule
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./features/cart/cart.module').then(m => m.CartModule),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./features/orders/orders.module').then(m => m.OrdersModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
