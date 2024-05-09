import { Routes } from '@angular/router';
import { RegisterComponent } from './infrastructure/page/auth/register/register.component';
import { LoginComponent } from './infrastructure/page/auth/login/login.component';
import { HomeComponent } from './infrastructure/page/home/home.component';
import { authGuard } from './infrastructure/guard/auth.guard';

export const routes: Routes = [
    { path: '', canActivateChild:[authGuard], children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'register', component: RegisterComponent },
        { path: 'login', component: LoginComponent},
        { path: 'home', component: HomeComponent}
    ]}
];
