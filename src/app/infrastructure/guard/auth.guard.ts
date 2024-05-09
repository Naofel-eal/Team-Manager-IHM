import { CanActivateChildFn, Router } from '@angular/router';
import { AuthenticationManager } from '../../core/application/service/authentication-manager/authentication-manager.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateChildFn = (route, state) => {
  const authenticationManager = inject(AuthenticationManager);
  const router = inject(Router);
  const currentRoute = state.url;

  const isAuthenticated = authenticationManager.isAuthenticated;
  const isAuthPage = currentRoute === '/login' || currentRoute === '/register';

  if (!isAuthenticated) {
    if (!isAuthPage) {
      router.navigateByUrl('/login');
      return false;
    }
  } else if (isAuthPage) {
      router.navigateByUrl('/home');
      return false;
    }

  return true;
};
