import { User } from "../../../model/user/user";

export interface IUserReferentielService {
    loadFreeUsers(): Promise<User[]>;
}