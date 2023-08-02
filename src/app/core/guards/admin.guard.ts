import { CanActivateFn } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { inject } from '@angular/core';
import { take } from 'rxjs';
import { isAdministrator$ } from '@shared/utils/auth';

export const adminGuard: CanActivateFn = (route, state) => {
  const oidcSecurityService = inject(OidcSecurityService);
  return isAdministrator$(oidcSecurityService).pipe(take(1));
};
