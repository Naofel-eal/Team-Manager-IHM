import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { httpInterceptor } from './infrastructure/interceptor/http.interceptor';
import {
  AUTHENTICATION_CLIENT_TOKEN,
  AUTHORIZATION_MANAGER_TOKEN, 
  TEAM_SERVICE_TOKEN, 
  TEAM_REPOSITORY_TOKEN, 
  USER_SERVICE_TOKEN, 
  USER_REPOSITORY_TOKEN
} from './infrastructure/config/injection-token/injection-token';
import { AuthenticationClient } from './infrastructure/service/authentication-client/authentication.client';
import { TeamRepository } from './infrastructure/service/team-repository/team-repository';
import { UserRepository } from './infrastructure/service/user-repository/user-repository.service';
import { MessageService } from 'primeng/api';
import { TeamService } from './core/application/service/service/team.service';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { UserReferentielService } from './core/application/service/service/user.service';
import { AuthorizationManager } from './core/application/service/authorization-manager/authorization-manager.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    MessageService,
    DynamicDialogModule,
    provideHttpClient(withInterceptors([httpInterceptor])),
    { provide: AUTHENTICATION_CLIENT_TOKEN, useClass: AuthenticationClient },
    { provide: TEAM_REPOSITORY_TOKEN, useClass: TeamRepository },
    { provide: USER_REPOSITORY_TOKEN, useClass: UserRepository },
    { provide: TEAM_SERVICE_TOKEN, useClass: TeamService },
    { provide: USER_SERVICE_TOKEN, useClass: UserReferentielService },
    { provide: AUTHORIZATION_MANAGER_TOKEN, useClass: AuthorizationManager },
  ]
};
