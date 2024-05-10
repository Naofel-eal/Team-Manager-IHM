import { TestBed } from '@angular/core/testing';
import { AuthorizationManager } from './authorization-manager.service';
import { AuthenticationManager } from '../authentication-manager/authentication-manager.service';
import { Team } from '../../../model/team/team';
import { User } from '../../../model/user/user';
import { RoleCode } from '../../../model/role/roleCode';
import { IAuthenticationClient } from '../../repository/iauthentication-client';
import { AUTHENTICATION_CLIENT_TOKEN } from '../../../../infrastructure/config/injection-token/injection-token';

describe('AuthorizationManager', () => {
  let service: AuthorizationManager;
  let authenticationManagerMock: jasmine.SpyObj<AuthenticationManager>;
  let authClientMock: jasmine.SpyObj<IAuthenticationClient>;

  const mockAdminUser: User = {
    firstname: 'Admin',
    lastname: 'User',
    email: 'admin@example.com',
    role: RoleCode.ADMIN
  };

  const mockManagerUser: User = {
    firstname: 'Manager',
    lastname: 'User',
    email: 'manager@example.com',
    role: RoleCode.MANAGER
  };

  const mockRegularUser: User = {
    firstname: 'Regular',
    lastname: 'User',
    email: 'regular@example.com',
    role: RoleCode.USER
  };

  const mockTeam: Team = {
    id: 1,
    manager: mockManagerUser,
    members: [mockRegularUser]
  };

  const mockToken = {
    token: 'mock-token',
    user: mockAdminUser
  };

  beforeEach(() => {
    authenticationManagerMock = jasmine.createSpyObj<AuthenticationManager>('AuthenticationManager', ['authentication']);
    authClientMock = jasmine.createSpyObj<IAuthenticationClient>('IAuthenticationClient', ['login', 'register']);

    TestBed.configureTestingModule({
      providers: [
        AuthorizationManager,
        { provide: AuthenticationManager, useValue: authenticationManagerMock },
        { provide: AUTHENTICATION_CLIENT_TOKEN, useValue: authClientMock },
      ]
    });

    service = TestBed.inject(AuthorizationManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('canCreateTeam', () => {
    it('should return true if the user is an admin', () => {
      authenticationManagerMock.authentication = mockToken;
      expect(service.canCreateTeam()).toBeTrue();
    });

    it('should return false if the user is not an admin', () => {
      authenticationManagerMock.authentication!.user = mockManagerUser;
      expect(service.canCreateTeam()).toBeFalse();
    });
  });

  describe('canDeleteTeam', () => {
    it('should return true if the user is an admin', () => {
      authenticationManagerMock.authentication!.user = mockAdminUser;
      expect(service.canDeleteTeam()).toBeTrue();
    });

    it('should return false if the user is not an admin', () => {
      authenticationManagerMock.authentication!.user = mockManagerUser;
      expect(service.canDeleteTeam()).toBeFalse();
    });
  });

  describe('canAddMemberToTeam', () => {
    it('should return true if the user is an admin', () => {
      authenticationManagerMock.authentication!.user = mockAdminUser;
      expect(service.canAddMemberToTeam(mockTeam)).toBeTrue();
    });

    it('should return true if the user is the team manager', () => {
      authenticationManagerMock.authentication!.user = mockManagerUser;
      expect(service.canAddMemberToTeam(mockTeam)).toBeTrue();
    });

    it('should return false if the user is not an admin or the team manager', () => {
      authenticationManagerMock.authentication!.user = mockRegularUser;
      expect(service.canAddMemberToTeam(mockTeam)).toBeFalse();
    });
  });

  describe('canRemoveMemberFromTeam', () => {
    it('should return true if the user is an admin', () => {
      authenticationManagerMock.authentication!.user = mockAdminUser;
      expect(service.canRemoveMemberFromTeam(mockTeam)).toBeTrue();
    });

    it('should return true if the user is the team manager', () => {
      authenticationManagerMock.authentication!.user = mockManagerUser;
      expect(service.canRemoveMemberFromTeam(mockTeam)).toBeTrue();
    });

    it('should return false si le membre n\'est pas un admin ou le manager', () => {
      authenticationManagerMock.authentication!.user = mockRegularUser;
      expect(service.canRemoveMemberFromTeam(mockTeam)).toBeFalse();
    });
  });

  describe('canCreateUser', () => {
    it('should return true si l\'utilisateur est un admin', () => {
      authenticationManagerMock.authentication!.user = mockAdminUser;
      expect(service.canCreateUser()).toBeTrue();
    });

    it('should return false si l\'utilisateur n\'est pas un admin', () => {
      authenticationManagerMock.authentication!.user = mockManagerUser;
      expect(service.canCreateUser()).toBeFalse();
    });
  });

  describe('canDeleteUser', () => {
    it('should return true si l\'utilisateur est un admin', () => {
      authenticationManagerMock.authentication!.user = mockAdminUser;
      expect(service.canDeleteUser()).toBeTrue();
    });

    it('should return false si l\'utilisateur n\'est pas un admin', () => {
      authenticationManagerMock.authentication!.user = mockManagerUser;
      expect(service.canDeleteUser()).toBeFalse();
    });
  });
});
