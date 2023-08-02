import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CabinetRoutingModule } from './cabinet-routing.module';
import { CabinetComponent } from './pages/cabinet/cabinet.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavMenuComponent } from './components/sidenav-menu/sidenav-menu.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CabinetComponent, SidenavMenuComponent],
  exports: [SidenavMenuComponent],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
  ],
})
export class CabinetModule {}
