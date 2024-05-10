import { Routes } from '@angular/router';
import { LoginComponent } from './infrastructure/page/auth/login/login.component';
import { HomeComponent } from './infrastructure/page/home/home.component';
import { authGuard } from './infrastructure/guard/auth.guard';

export const routes: Routes = [
    { path: '', canActivateChild:[authGuard], children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'login', component: LoginComponent},
        { path: 'home', component: HomeComponent}
    ]},
    { path: '**', redirectTo: 'home' }
];
