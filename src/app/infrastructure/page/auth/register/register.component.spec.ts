import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthenticationManager } from '../../../../core/application/service/authentication-manager/authentication-manager.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authenticationManagerMock: jasmine.SpyObj<AuthenticationManager>;
  let routerMock: jasmine.SpyObj<Router>;
  let messageServiceMock: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    authenticationManagerMock = jasmine.createSpyObj<AuthenticationManager>('AuthenticationManager', ['register']);
    routerMock = jasmine.createSpyObj<Router>('Router', ['navigate']);
    messageServiceMock = jasmine.createSpyObj<MessageService>('MessageService', ['add']);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        { provide: AuthenticationManager, useValue: authenticationManagerMock },
        { provide: Router, useValue: routerMock },
        { provide: MessageService, useValue: messageServiceMock }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
