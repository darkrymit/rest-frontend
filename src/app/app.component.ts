import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'rest-frontend';

  constructor(private oidcSecurityService: OidcSecurityService) {}

  ngOnInit(): void {
    if (!window.location.pathname.includes('/auth/callback')) {
      this.oidcSecurityService.checkAuth().subscribe();
    }
  }
}
