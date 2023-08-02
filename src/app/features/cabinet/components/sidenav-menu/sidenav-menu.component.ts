import { Component } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss'],
})
export class SidenavMenuComponent {
  name$: Observable<string> = this.oidcSecurityService.userData$.pipe(
    map(({ userData: data }) => data.name)
  );

  email$: Observable<string> = this.oidcSecurityService.userData$.pipe(
    map(({ userData: data }) => data.email)
  );

  constructor(private oidcSecurityService: OidcSecurityService) {}
}
