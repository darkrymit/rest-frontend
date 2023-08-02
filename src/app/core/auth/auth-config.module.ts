import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { environment } from '@env';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        configId: 'main-oidc',
        triggerAuthorizationResultEvent: true,
        authority: 'http://localhost:8080/realms/oauth2-realm',
        redirectUrl: window.location.origin + '/auth/callback/main-oidc',
        postLogoutRedirectUri: window.location.origin,
        clientId: 'angular',
        scope: 'openid profile email offline_access', // 'openid profile ' + your scopes
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        ignoreNonceAfterRefresh: true,
        logLevel: environment.production ? LogLevel.None : LogLevel.Debug,
        secureRoutes: ['http://localhost:8081'],
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
