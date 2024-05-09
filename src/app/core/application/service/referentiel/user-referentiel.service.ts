import { Inject, Injectable } from "@angular/core";
import { lastValueFrom, map } from "rxjs";
import { IUserReferentielService } from "./iuser-referentiel.service";
import { User } from "../../../model/user/user";
import { IUserRepository } from "../../repository/iuser-repository";
import { USER_REPOSITORY_TOKEN } from "../../../../infrastructure/config/injection-token/injection-token";

@Injectable({
    providedIn: 'root'
})
export class UserReferentielService implements IUserReferentielService {
    public constructor(
        @Inject(USER_REPOSITORY_TOKEN) private _userRepository: IUserRepository
    ) {}

    loadFreeUsers(): Promise<User[]> {
        return lastValueFrom(
            this._userRepository.getFreeUsers().pipe(
                map((res) => res.freeUsers))
        );
    }
}