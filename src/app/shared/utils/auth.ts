import {
  ConfigAuthenticatedResult,
  OidcSecurityService,
} from 'angular-auth-oidc-client';
import {
  distinctUntilChanged,
  filter,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';

export function isAuthenticated$(
  service: OidcSecurityService
): Observable<boolean>;
export function isAuthenticated$(
  service: OidcSecurityService,
  configId?: string
): Observable<boolean> {
  if (!configId) {
    return service.isAuthenticated$.pipe(
      map(result => result.isAuthenticated),
      distinctUntilChanged()
    );
  }
  return service.isAuthenticated$.pipe(
    map(result =>
      result.allConfigsAuthenticated.find(
        config => config.configId === configId
      )
    ),
    filter((result): result is ConfigAuthenticatedResult => !!result),
    map(result => result.isAuthenticated),
    distinctUntilChanged()
  );
}

export function isAdministrator$(
  service: OidcSecurityService
): Observable<boolean> {
  return isAuthenticated$(service).pipe(
    switchMap(isAuthenticated => {
      if (isAuthenticated) {
        return service.getPayloadFromAccessToken().pipe(
          map((data: any) => data.realm_access.roles as string[]),
          map((roles: string[]) => roles.includes('Administrator'))
        );
      }
      return of(false);
    }),
    distinctUntilChanged()
  );
}
