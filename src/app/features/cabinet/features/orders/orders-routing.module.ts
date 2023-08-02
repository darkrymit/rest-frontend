import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrdersPageResolver } from '@features/cabinet/features/orders/resolvers/orders-page.resolver';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    runGuardsAndResolvers: 'always',
    resolve: {
      page: OrdersPageResolver,
    },
    data: {
      sizes: [5, 10, 20],
      defaultSort: [{ property: 'creationDate', direction: 'ASC' }],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
