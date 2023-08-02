import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Store } from '@ngrx/store';
import { CartActions, CartQuery } from '@store/cart';
import { isAuthenticated$ } from '@shared/utils/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated$ = isAuthenticated$(this.oidcSecurityService);

  @Output() sidenavToggle = new EventEmitter<void>();

  searchFocused = false;

  cartLength$ = this.store.select(CartQuery.selectCartItemsCount);

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(CartActions.loadCart());
  }

  login() {
    sessionStorage.setItem('redirectUrl', window.location.pathname);
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService
      .logoffAndRevokeTokens()
      .subscribe(() => console.log('logged out'));
  }

  onFocusChanged(focused: boolean) {
    this.searchFocused = focused;
  }
}
