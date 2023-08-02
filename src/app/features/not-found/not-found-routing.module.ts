import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

const routes: Routes = [
  {
    path: '',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [RouterModule.forChild(routes), MatCardModule, MatDividerModule],
  exports: [RouterModule],
})
export class NotFoundRoutingModule {}
