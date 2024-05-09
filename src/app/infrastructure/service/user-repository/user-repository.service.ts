import { Injectable } from '@angular/core';
import { IUserRepository } from '../../../core/application/repository/iuser-repository';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRepository implements IUserRepository {
  constructor() { }
  createUser(firstname: string, lastname: string, email: string, password: string): Observable<any> {
    throw new Error('Method not implemented.');
  }
  deleteUser(userEmail: string): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
