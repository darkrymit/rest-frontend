import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalInformationRoutingModule } from './personal-information-routing.module';
import { PersonalInformationComponent } from './pages/personal-information/personal-information.component';
import { UserResolver } from './user.resolver';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [PersonalInformationComponent],
  imports: [CommonModule, PersonalInformationRoutingModule, MatExpansionModule],
  providers: [UserResolver],
})
export class PersonalInformationModule {}
