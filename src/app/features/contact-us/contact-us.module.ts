import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsPageComponent } from './contact-us-page/contact-us-page.component';

@NgModule({
  declarations: [ContactUsPageComponent],
  imports: [CommonModule, ContactUsRoutingModule],
})
export class ContactUsModule {}
