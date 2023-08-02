import { isDevMode, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { AuthConfigModule } from '@core/auth';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from 'angular-auth-oidc-client';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { SidenavMenuComponent } from './components/sidenav-menu/sidenav-menu.component';
import { HeaderSearchComponent } from './components/header-search/header-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StoreModule } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { appEffects, appReducers } from '@store/app.state';

import localeUA from '@angular/common/locales/uk';
import { environment } from '@env';

// Register the localization
registerLocaleData(localeUA, 'uk');

if (!environment.production) {
  (Map.prototype as any).toJSON = function () {
    return JSON.parse(JSON.stringify([...this]));
  };
}

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidenavMenuComponent,
    HeaderSearchComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidenavMenuComponent,
    MatSidenavModule,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AuthConfigModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    MatListModule,
    MatSidenavModule,
    RouterLink,
    ReactiveFormsModule,
    MatTooltipModule,
    MatBadgeModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot(appReducers, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    EffectsModule.forRoot(appEffects),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: 'uk',
    },
  ],
})
export class CoreModule {}
