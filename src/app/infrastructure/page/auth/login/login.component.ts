import { Component, OnDestroy } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { AuthenticationManager } from '../../../../core/application/service/authentication-manager/authentication-manager.service';
import { MessageService } from 'primeng/api';
import { Authentication } from '../../../../core/model/auth/authentication';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    PasswordModule,
    DividerModule,
    FormsModule,
    FloatLabelModule,
    InputTextModule,
    TabViewModule,
    ButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {
  public email: string = '';
  public password: string = '';
  public isLoading: boolean = false;

  public constructor(
    private _authenticationManager: AuthenticationManager,
    private _messageService: MessageService,
    private _router: Router
  ) {}
  
  public async login(): Promise<void> {
    if (!this.validateData()) 
    return;

    this.isLoading = true;
    this._authenticationManager.login(this.email, this.password)
      .then(_ => {
        this.isLoading = false;
        this._router.navigate(['/home']);
      })
      .catch(() => {
        this.isLoading = false;
        this.password = '';
      });
  }

  private validateData(): boolean {
    return (
      this.validateEmail() &&
      this.validatePassword()
    );
  }

  private validateEmail(): boolean {
    const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const isValid: boolean = EMAIL_REGEX.test(this.email);
    if (!isValid)
      this._messageService.add({severity:'error', summary:'Error', detail:'Email invalide'});
    return isValid;
  }

  private validatePassword(): boolean {
    const isValid = this.password !== "";
    if (!isValid)
      this._messageService.add({severity:'error', summary:'Error', detail:'Mot de passe invalide'});
    return isValid;
  }
}
