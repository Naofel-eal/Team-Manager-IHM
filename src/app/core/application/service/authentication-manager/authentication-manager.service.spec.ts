import { TestBed } from '@angular/core/testing';
import { AuthenticationManager } from './authentication-manager.service';
import { AUTHENTICATION_CLIENT_TOKEN } from '../../../../infrastructure/config/injection-token/injection-token';
import { IAuthenticationClient } from '../../repository/iauthentication-client';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Authentication } from '../../../model/auth/authentication';
import { RoleCode } from '../../../model/role/roleCode';

describe('AuthenticationManager', () => {
  let service: AuthenticationManager;
  let authClientMock: jasmine.SpyObj<IAuthenticationClient>;
  let routerMock: jasmine.SpyObj<Router>;
  const authenticationMock: Authentication = {
    token: 'mock-token',
    user: {
      firstname: 'Nao',
      lastname: 'Fel',
      email: 'nao.fel@example.com',
      role: RoleCode.USER
    }
  };

  beforeEach(() => {
    authClientMock = jasmine.createSpyObj<IAuthenticationClient>('IAuthenticationClient', ['login', 'register']);
    routerMock = jasmine.createSpyObj<Router>('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthenticationManager,
        { provide: AUTHENTICATION_CLIENT_TOKEN, useValue: authClientMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    service = TestBed.inject(AuthenticationManager);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should set authentication on successful login', async () => {
      authClientMock.login.and.returnValue(of(authenticationMock));

      await service.login('nao.fel@example.com', 'password');

      expect(service.authentication).toEqual(authenticationMock);
      expect(localStorage.getItem('authentication')).toEqual(JSON.stringify(authenticationMock));
    });

    it('should handle login error gracefully', async () => {
      authClientMock.login.and.returnValue(throwError(() => new Error('Login failed')));

      try {
        await service.login('nao.fel@example.com', 'password');
        fail('Expected error to be thrown');
      } catch (e: any) {
        expect(e.message).toBe('Login failed');
        expect(service.authentication).toBeNull();
        expect(localStorage.getItem('authentication')).toBeNull();
      }
    });
  });

  describe('register', () => {
    it('should call the register method of the authentication client', async () => {
      authClientMock.register.and.returnValue(of(void 0));

      await service.register('Nao', 'Fel', 'nao.fel@example.com', 'password');

      expect(authClientMock.register).toHaveBeenCalledWith('Nao', 'Fel', 'nao.fel@example.com', 'password');
    });
  });

  describe('logout', () => {
    it('should clear authentication and navigate to login', () => {
      service.authentication = authenticationMock;

      service.logout();

      expect(service.authentication).toBeNull();
      expect(localStorage.getItem('authentication')).toBeNull();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('revokeAuthentication', () => {
    it('should clear authentication and navigate to login', () => {
      service.authentication = authenticationMock;

      service.revokeAuthentication();

      expect(service.authentication).toBeNull();
      expect(localStorage.getItem('authentication')).toBeNull();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('persistAuthentication', () => {
    it('should save authentication to localStorage', () => {
      service.authentication = authenticationMock;

      expect(localStorage.getItem('authentication')).toEqual(JSON.stringify(authenticationMock));
    });

    it('should not save authentication if it is null', () => {
      service.authentication = null;

      expect(localStorage.getItem('authentication')).toBeNull();
    });
  });

  describe('loadAuthentication', () => {
    it('should load authentication from localStorage if available', () => {
      localStorage.setItem('authentication', JSON.stringify(authenticationMock));

      const authenticationManager = new AuthenticationManager(authClientMock, routerMock);

      expect(authenticationManager.authentication).toEqual(authenticationMock);
    });

    it('should set authentication to null if not available in localStorage', () => {
      const loadedService = TestBed.inject(AuthenticationManager);

      expect(loadedService.authentication).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if authentication is set', () => {
      service.authentication = authenticationMock;

      expect(service.isAuthenticated).toBeTrue();
    });

    it('should return false if authentication is null', () => {
      service.authentication = null;

      expect(service.isAuthenticated).toBeFalse();
    });
  });
});
