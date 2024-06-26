import { InjectionToken } from "@angular/core";
import { ITeamRepository } from "../../../core/application/repository/iteam-respository";
import { IUserRepository } from "../../../core/application/repository/iuser-repository";
import { IAuthenticationClient } from "../../../core/application/repository/iauthentication-client";
import { ITeamService } from "../../../core/application/service/service/iteam.service";
import { IUserService } from "../../../core/application/service/service/iuser.service";
import { IAuthorizationManager } from "../../../core/application/repository/iauthorization-manager";

export const AUTHENTICATION_CLIENT_TOKEN = new InjectionToken<IAuthenticationClient>('AUTHENTICATION_CLIENT_TOKEN');
export const TEAM_REPOSITORY_TOKEN = new InjectionToken<ITeamRepository>('TEAM_REPOSITORY_TOKEN');
export const USER_REPOSITORY_TOKEN = new InjectionToken<IUserRepository>('USER_REPOSITORY_TOKEN');
export const TEAM_SERVICE_TOKEN = new InjectionToken<ITeamService>('TEAM_SERVICE_TOKEN');
export const USER_SERVICE_TOKEN = new InjectionToken<IUserService>('USER_SERVICE_TOKEN');
export const AUTHORIZATION_MANAGER_TOKEN = new InjectionToken<IAuthorizationManager>('AUTHORIZATION_MANAGER_TOKEN');