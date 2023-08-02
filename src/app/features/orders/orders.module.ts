import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { SuccessComponent } from './pages/success/success.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SuccessComponent],
  imports: [CommonModule, OrdersRoutingModule, MatCardModule, MatButtonModule],
})
export class OrdersModule {}
