import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailedComponent } from '@features/cart/pages/detailed/detailed.component';
import { cartResolver } from '@features/cart/resolvers/cart.resolver';

const routes: Routes = [
  {
    path: '',
    component: DetailedComponent,
    runGuardsAndResolvers: 'always',
    resolve: {
      cartLoaded: cartResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
