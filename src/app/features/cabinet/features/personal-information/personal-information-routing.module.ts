import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalInformationComponent } from './pages/personal-information/personal-information.component';
import { UserResolver } from './user.resolver';

const routes: Routes = [
  {
    path: '',
    component: PersonalInformationComponent,
    resolve: {
      user: UserResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalInformationRoutingModule {}
