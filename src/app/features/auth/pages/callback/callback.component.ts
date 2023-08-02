import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent implements OnInit {
  error = false;
  success = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private oidcSecurityService: OidcSecurityService
  ) {}

  ngOnInit(): void {
    let configId = this.route.snapshot.paramMap.get('configId');
    let stateQueryParam = this.route.snapshot.queryParamMap.get('state');
    if (!configId || !stateQueryParam) {
      console.log('no configId or state');
      this.router.navigate(['/']);
      return;
    }

    this.oidcSecurityService
      .checkAuth(undefined, configId)
      .subscribe(response => {
        if (!response.isAuthenticated) {
          this.error = true;
          return;
        }
        console.log(response);
        let url = this.determineRedirectUrl();
        this.router.navigate([url]);
      });
  }

  determineRedirectUrl(): string {
    let redirectUrl = sessionStorage.getItem('redirectUrl');
    return redirectUrl ? redirectUrl : '/';
  }
}
