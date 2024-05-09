import { User } from "../user/user";

export class Team {
    public id!: number;
    public manager!: User;
    public members!: User[];

    public constructor(init?: Partial<Team>) {
        Object.assign(this, init);
    }
}