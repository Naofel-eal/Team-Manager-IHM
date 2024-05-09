import { User } from "../user/user";

export class Team {
    public manager!: User;
    public members!: Set<User>;

    public constructor(init?: Partial<Team>) {
        Object.assign(this, init);
    }
}