import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterFormComponent } from './register-form.component';
import { MessageService } from 'primeng/api';
import { AuthenticationManager } from '../../../core/application/service/authentication-manager/authentication-manager.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let authenticationManagerSpy: jasmine.SpyObj<AuthenticationManager>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;
  let dynamicDialogRefSpy: jasmine.SpyObj<DynamicDialogRef>;

  beforeEach(async () => {
    authenticationManagerSpy = jasmine.createSpyObj('AuthenticationManager', ['register']);
    messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);
    dynamicDialogRefSpy = jasmine.createSpyObj('DynamicDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [RegisterFormComponent, FormsModule, PasswordModule],
      providers: [
        { provide: AuthenticationManager, useValue: authenticationManagerSpy },
        { provide: MessageService, useValue: messageServiceSpy },
        { provide: DynamicDialogRef, useValue: dynamicDialogRefSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('validateData', () => {
    it('should validate data correctly', () => {
      component.firstname = 'John';
      component.lastname = 'Doe';
      component.email = 'john.doe@example.com';
      component.password = 'Password1';
      expect(component.validateData()).toBeTrue();
    });

    it('should handle invalid data', () => {
      component.firstname = '123';  
      expect(component.validateData()).toBeFalse();
      expect(messageServiceSpy.add).toHaveBeenCalled();
    });
  });

  describe('register', () => {
    it('should not call register if data is invalid', async () => {
      spyOn(component, 'validateData').and.returnValue(false);
      await component.register();
      expect(authenticationManagerSpy.register).not.toHaveBeenCalled();
    });

    it('should call register if data is valid', async () => {
      spyOn(component, 'validateData').and.returnValue(true);
      authenticationManagerSpy.register.and.resolveTo();
      await component.register();
      expect(authenticationManagerSpy.register).toHaveBeenCalled();
      expect(dynamicDialogRefSpy.close).toHaveBeenCalledWith(true);
    });

    it('should reset password on registration failure', async () => {
      spyOn(component, 'validateData').and.returnValue(true);
      authenticationManagerSpy.register.and.rejectWith(new Error('fail'));
      await component.register();
      expect(component.password).toEqual('');
    });
  });
});
export { RegisterFormComponent };

