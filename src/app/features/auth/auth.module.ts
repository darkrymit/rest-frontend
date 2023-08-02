import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { CallbackComponent } from './pages/callback/callback.component';

@NgModule({
  declarations: [CallbackComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
