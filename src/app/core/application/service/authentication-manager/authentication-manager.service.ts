import { Inject, Injectable } from '@angular/core';
import { IAuthenticationClient } from '../../repository/iauthentication-client';
import { AUTHENTICATION_CLIENT_TOKEN } from '../../../../infrastructure/config/injection-token/injection-token';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Authentication } from '../../../model/auth/authentication';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationManager {
  private _authenticationPersistenceKey: string = "authentication";
  private _authentication: Authentication | null = null;

  constructor(
    @Inject(AUTHENTICATION_CLIENT_TOKEN) private _authenticationClient: IAuthenticationClient,
    private _router: Router
  ){
    this.loadAuthentication();
  }

  public get authentication(): Authentication | null {
    return this._authentication
  }

  public set authentication(authentication: Authentication) {
    this._authentication = authentication
    this.persistAuthentication();
  }

  public get isAuthenticated(): boolean {
    return this._authentication !== null;
  }

  public login(email: string, password: string): Subscription {
    return this._authenticationClient.login(email, password)
      .subscribe({
        next: (response: Authentication) => {
          this.authentication = response;
          this._router.navigate(['/']);
        }
    });
  }

  public register(firstname: string, lastname: string, email: string, password: string): Subscription {
    return this._authenticationClient.register(firstname, lastname, email, password)
      .subscribe({
        next: () => this._router.navigate(['/login'])
    });
  }

  public logout(): void {
    this.revokeAuthentication();
    this._router.navigate(['/login']);
  }

  private persistAuthentication(): void {
    if (this._authentication) {
      localStorage.setItem(this._authenticationPersistenceKey, JSON.stringify(this._authentication));
    }
  }

  public revokeAuthentication(): void {
    this._authentication = null
    localStorage.removeItem(this._authenticationPersistenceKey);
    this._router.navigate(['/login']);
  }

  private loadAuthentication() {
    const authenticationStr: string | null = localStorage.getItem(this._authenticationPersistenceKey);
    const authentication: Authentication | null = authenticationStr ? JSON.parse(authenticationStr) : null;
    this._authentication = authentication ?? null;
  }
}