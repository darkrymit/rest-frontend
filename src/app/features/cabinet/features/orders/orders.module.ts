import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderComponent } from './components/order/order.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OrdersPageResolver } from '@features/cabinet/features/orders/resolvers/orders-page.resolver';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { OrderItemSmartComponent } from './components/order-item-smart/order-item-smart.component';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    OrdersComponent,
    OrderComponent,
    OrderItemComponent,
    OrderItemSmartComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    SharedModule,
  ],
  providers: [OrdersPageResolver],
})
export class OrdersModule {}
