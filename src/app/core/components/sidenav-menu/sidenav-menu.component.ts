import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { isAdministrator$, isAuthenticated$ } from '@shared/utils/auth';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss'],
})
export class SidenavMenuComponent {
  @Input() side!: MatSidenav;

  isAuthenticated$ = isAuthenticated$(this.oidcSecurityService);

  isAdmin$ = isAdministrator$(this.oidcSecurityService);

  constructor(private oidcSecurityService: OidcSecurityService) {}
}
