import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetComponent } from './pages/cabinet/cabinet.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'personal-information',
    pathMatch: 'full',
  },
  {
    path: 'personal-information',
    component: CabinetComponent,
    loadChildren: () =>
      import(
        './features/personal-information/personal-information.module'
      ).then(m => m.PersonalInformationModule),
  },
  {
    path: 'orders',
    component: CabinetComponent,
    loadChildren: () =>
      import('./features/orders/orders.module').then(m => m.OrdersModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CabinetRoutingModule {}
