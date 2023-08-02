import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { take } from 'rxjs';
import { isAuthenticated$ } from '@shared/utils/auth';

export const authorizedGuard: CanActivateFn = (route, state) => {
  const oidcSecurityService = inject(OidcSecurityService);
  return isAuthenticated$(oidcSecurityService).pipe(take(1));
};
