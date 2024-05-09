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
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public firstname: string = '';
  public lastname: string = '';
  public email: string = '';
  public password: string = '';

  constructor(
    private _authenticationManager: AuthenticationManager,
    private messageService: MessageService
  ) {}

  public register(): void {
    if(this.validateData())
      this._authenticationManager.register(this.firstname, this.lastname, this.email, this.password);
  }

  private validateData(): boolean {
    return (
      this.firstname.trim() !== "" &&
      this.lastname.trim() !== "" &&
      this.validateEmail() &&
      this.validatePassword()
    );
  }

  private validateEmail(): boolean {
    const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const isValid: boolean = EMAIL_REGEX.test(this.email);
    if (!isValid)
      this.messageService.add({severity:'error', summary:'Error', detail:'Email invalide'});
    return isValid;
  }

  private validatePassword(): boolean {
    const MIN_PASSWORD_LENGTH = 8;
    const containsDigit = /\d/.test(this.password);
    const containsUpperCase = /[A-Z]/.test(this.password);
    const containsLowerCase = /[a-z]/.test(this.password);

    const isValid: boolean = (
      this.password.length >= MIN_PASSWORD_LENGTH &&
      containsDigit &&
      containsUpperCase &&
      containsLowerCase
    );
    if (!isValid)
      this.messageService.add({severity:'error', summary:'Error', detail:'Mot de passe invalide'});
    return isValid;
  }
}
