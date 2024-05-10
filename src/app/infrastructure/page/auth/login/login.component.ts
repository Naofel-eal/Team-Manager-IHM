import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { AuthenticationManager } from '../../../../core/application/service/authentication-manager/authentication-manager.service';
import { MessageService } from 'primeng/api';

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
export class LoginComponent {
  public email: string = '';
  public password: string = '';
  
  public constructor(
    private _authenticationManager: AuthenticationManager,
    private _messageService: MessageService
  ) {}

  public login(): void {
    if(this.validateData())
      this._authenticationManager.login(this.email, this.password);
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
