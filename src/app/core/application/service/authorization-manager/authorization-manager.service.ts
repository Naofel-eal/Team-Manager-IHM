import { Injectable } from '@angular/core';
import { IAuthorizationManager } from '../../repository/iauthorization-manager';
import { Team } from '../../../model/team/team';
import { AuthenticationManager } from '../authentication-manager/authentication-manager.service';
import { User } from '../../../model/user/user';
import { RoleCode } from '../../../model/role/roleCode';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationManager implements IAuthorizationManager {
  public constructor(private _authenticationManager: AuthenticationManager) {}

  public get loggedUser(): User | undefined {
    return this._authenticationManager.authentication?.user;
  }

  canCreateTeam(): boolean {
    return this.loggedUser?.role === RoleCode.ADMIN;
  }

  canDeleteTeam(): boolean {
    return this.loggedUser?.role === RoleCode.ADMIN;
  }

  canAddMemberToTeam(team: Team): boolean {
    return this.loggedUser?.role === RoleCode.ADMIN ||
      team.manager.email === this.loggedUser?.email;
  }

  canRemoveMemberFromTeam(team: Team): boolean {
    return this.loggedUser?.role === RoleCode.ADMIN ||
      team.manager.email === this.loggedUser?.email;
  }

  canCreateUser(): boolean {
    return this.loggedUser?.role === RoleCode.ADMIN;
  }
  
  canDeleteUser(): boolean {
    return this.loggedUser?.role === RoleCode.ADMIN;
  }
  
}
