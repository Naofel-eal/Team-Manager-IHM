import { Inject, Injectable } from "@angular/core";
import { lastValueFrom, map } from "rxjs";
import { IUserService } from "./iuser.service";
import { User } from "../../../model/user/user";
import { IUserRepository } from "../../repository/iuser-repository";
import { USER_REPOSITORY_TOKEN } from "../../../../infrastructure/config/injection-token/injection-token";
import { MessageService } from "primeng/api";

@Injectable({
    providedIn: 'root'
})
export class UserReferentielService implements IUserService {
    public constructor(
        @Inject(USER_REPOSITORY_TOKEN) private _userRepository: IUserRepository,
        private _messageService: MessageService
    ) {}

    createUser(firstname: string, lastname: string, email: string, password: string): Promise<void> {
        return lastValueFrom(this._userRepository.createUser(firstname, lastname, email, password));
    }

    public deleteUser(email: string): Promise<void> {
        this._messageService.add({severity: 'info', summary: 'Restez à jour !', detail: 'Cette fonctionnalité arrive bientot !'});
        return new Promise<void>((resolve) => {resolve()});
    }

    public loadFreeUsers(): Promise<User[]> {
        return lastValueFrom(
            this._userRepository.getFreeUsers().pipe(
                map((res) => res.freeUsers))
        );
    }
}