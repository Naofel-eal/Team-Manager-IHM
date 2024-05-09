import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { httpInterceptor } from './infrastructure/interceptor/http.interceptor';
import { AUTHENTICATION_CLIENT_TOKEN, TEAM_REFERENTIEL_SERVICE, TEAM_REPOSITORY_TOKEN, USER_REPOSITORY_TOKEN } from './infrastructure/config/injection-token/injection-token';
import { AuthenticationClient } from './infrastructure/service/authentication-client/authentication.client';
import { TeamRepository } from './infrastructure/service/team-repository/team-repository';
import { UserRepository } from './infrastructure/service/user-repository/user-repository.service';
import { MessageService } from 'primeng/api';
import { TeamReferentielService } from './core/application/service/referentiel/team-referentiel.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    MessageService,
    provideHttpClient(withInterceptors([httpInterceptor])),
    { provide: AUTHENTICATION_CLIENT_TOKEN, useClass: AuthenticationClient },
    { provide: TEAM_REPOSITORY_TOKEN, useClass: TeamRepository },
    { provide: USER_REPOSITORY_TOKEN, useClass: UserRepository},
    { provide: TEAM_REFERENTIEL_SERVICE, useClass: TeamReferentielService}
  ]
};
