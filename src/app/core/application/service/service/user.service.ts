import { Inject, Injectable } from "@angular/core";
import { lastValueFrom, map } from "rxjs";
import { IUserService } from "./iuser.service";
import { User } from "../../../model/user/user";
import { IUserRepository } from "../../repository/iuser-repository";
import { USER_REPOSITORY_TOKEN } from "../../../../infrastructure/config/injection-token/injection-token";

@Injectable({
    providedIn: 'root'
})
export class UserReferentielService implements IUserService {
    public constructor(
        @Inject(USER_REPOSITORY_TOKEN) private _userRepository: IUserRepository
    ) {}

    createUser(firstname: string, lastname: string, email: string, password: string): Promise<void> {
        return lastValueFrom(this._userRepository.createUser(firstname, lastname, email, password));
    }

    public deleteUser(email: string): Promise<void> {
        return lastValueFrom(this._userRepository.deleteUser(email));
    }

    public loadFreeUsers(): Promise<User[]> {
        return lastValueFrom(
            this._userRepository.getFreeUsers().pipe(
                map((res) => res.freeUsers))
        );
    }
}