import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenticationManager } from '../../../../core/application/service/authentication-manager/authentication-manager.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticationManagerMock: jasmine.SpyObj<AuthenticationManager>;
  let routerMock: jasmine.SpyObj<Router>;
  let messageServiceMock: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    authenticationManagerMock = jasmine.createSpyObj<AuthenticationManager>('AuthenticationManager', ['login']);
    routerMock = jasmine.createSpyObj<Router>('Router', ['navigate']);
    messageServiceMock = jasmine.createSpyObj<MessageService>('MessageService', ['add']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthenticationManager, useValue: authenticationManagerMock },
        { provide: Router, useValue: routerMock },
        { provide: MessageService, useValue: messageServiceMock }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
