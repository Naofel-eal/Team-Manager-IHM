import { Injectable } from '@angular/core';
import { ITeamRepository } from '../../../core/application/repository/iteam-respository';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamRepository implements ITeamRepository{
  public constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    throw new Error('Method not implemented.');
  }

  addMember(managerEmail: string, memberEmail: string): Observable<any> {
    throw new Error('Method not implemented.');
  }

  removeMember(managerEmail: string, memberEmail: string): Observable<any> {
    throw new Error('Method not implemented.');
  }

  createTeam(futureManagerEmail: string): Observable<any> {
    throw new Error('Method not implemented.');
  }
  
  deleteTeam(futureManagerEmail: string): Observable<any> {
    throw new Error('Method not implemented.');
  }

}
