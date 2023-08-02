import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from '@features/auth/pages/callback/callback.component';

const routes: Routes = [
  {
    path: 'callback/:configId',
    component: CallbackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
