import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { DetailedComponent } from './pages/detailed/detailed.component';
import { CartFullComponent } from './components/cart-full/cart-full.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartItemSmartComponent } from './components/cart-item-smart/cart-item-smart.component';
import { SharedModule } from '@shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DetailedComponent,
    CartFullComponent,
    CartItemComponent,
    CartItemSmartComponent,
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
})
export class CartModule {}
