import { Injectable } from '@angular/core';
import { ITeamRepository } from '../../../core/application/repository/iteam-respository';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Team } from '../../../core/model/team/team';
import { ApiConstants } from '../../config/constant/api-constants';

@Injectable({
  providedIn: 'root'
})
export class TeamRepository implements ITeamRepository{
  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  public constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(ApiConstants.BASE_URL + ApiConstants.TEAM_GET_ALL, 
      { headers: this.headers });
  }

  addMember(managerEmail: string, memberEmail: string): Observable<Team> {
    return this.http.patch<Team>(
      `${ApiConstants.BASE_URL + ApiConstants.TEAM}/${managerEmail}/members/${memberEmail}`, 
      { headers: this.headers }
    );
  }

  removeMember(managerEmail: string, memberEmail: string): Observable<Team> {
    return this.http.delete<Team>(
      `${ApiConstants.BASE_URL + ApiConstants.TEAM}/${managerEmail}/members/${memberEmail}`, 
      { headers: this.headers }
    );
  }

  createTeam(futureManagerEmail: string): Observable<void> {
    return this.http.post<void>(
      `${ApiConstants.BASE_URL + ApiConstants.TEAM_CREATE}/${futureManagerEmail}`, 
      { headers: this.headers }
    );
  }

  deleteTeam(futureManagerEmail: string): Observable<void> {
    return this.http.delete<void>(
      `${ApiConstants.BASE_URL + ApiConstants.TEAM_DELETE}/${futureManagerEmail}`, 
      { headers: this.headers }
    );
  }

}
