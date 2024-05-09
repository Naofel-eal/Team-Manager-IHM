import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthenticationClient } from '../../../core/application/repository/iauthentication-client';
import { ApiConstants } from '../../config/constant/api-constants';
import { Authentication } from '../../../core/model/auth/authentication';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient implements IAuthenticationClient {
  constructor(
    private http: HttpClient,
  ) {}

  public login(email: string, password: string): Observable<Authentication> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Authentication>(
      ApiConstants.BASE_URL + ApiConstants.LOGIN, {
        email: email,
        password: password,
      },
      { headers }
    );
  }

  public register(firstname: string, lastname: string, email: string, password: string): Observable<void> {
    return this.http.post<void>(
        ApiConstants.BASE_URL + ApiConstants.REGISTER,
      {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      }
    );
  }
}