import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationManager } from '../../core/application/service/authentication-manager/authentication-manager.service';
import { ApiConstants } from '../config/constant/api-constants';
import { catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService: MessageService = inject(MessageService);
  const authenticationManager = inject(AuthenticationManager);
  const isTeamManagerKnownException = /\[[a-zA-Z]*_[0-9]*\]/;

  let authReq = req;
  if (req.url != ApiConstants.BASE_URL + ApiConstants.LOGIN && req.url != ApiConstants.BASE_URL + ApiConstants.REGISTER) {
    const authenticationManager = inject(AuthenticationManager);
    const authToken = authenticationManager.authentication?.token ?? '';
    
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
  }
  return next(authReq).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status == 403) {
          messageService.add({severity:'error', summary:'Token invalide', detail: 'Reconnectez vous.'});
          authenticationManager.revokeAuthentication();
        } else if (isTeamManagerKnownException.test(err.error)) {
          messageService.add({severity:'error', summary:'Erreur', detail: err.error});
        }
        else {
          messageService.add({severity:'error', summary:'Erreur', detail: err.statusText});
        }
      }

      return throwError(() => err); 
    })
  );;
};
