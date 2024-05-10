import { Injectable } from '@angular/core';
import { IUserRepository } from '../../../core/application/repository/iuser-repository';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiConstants } from '../../config/constant/api-constants';

@Injectable({
  providedIn: 'root'
})
export class UserRepository implements IUserRepository {
  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }
  
  getFreeUsers(): Observable<any> {
    return this.http.get<any>(ApiConstants.BASE_URL + ApiConstants.USER_FREE, { headers: this.headers });
  }
  
  createUser(firstname: string, lastname: string, email: string, password: string): Observable<any> {
    return this.http.post<void>(
      ApiConstants.BASE_URL + ApiConstants.USER,
      {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      },
      { headers: this.headers }
    );
  }

  deleteUser(userEmail: string): Observable<void> {
    return this.http.delete<void>(ApiConstants.BASE_URL + ApiConstants.USER + '/' + userEmail, { headers: this.headers });
  }
}
