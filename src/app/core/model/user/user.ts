import { RoleCode } from "../role/roleCode";

export class User {
  public firstname: string = '';
  public lastname: string = '';
  public email: string = '';
  public password: string = '';
  public role!: RoleCode;

  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}