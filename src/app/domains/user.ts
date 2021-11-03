import {Role} from "./role";

export class User {
  id: number;
  login: string;
  password: string;
  name: string;
  surname: string;
  middlename: string;
  email: string;
  roles: Role[];

  constructor(id: number, login: string, password: string, name: string, surname: string, middlename: string, email: string, roles: Role[]) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.name = name;
    this.surname = surname;
    this.middlename = middlename;
    this.email = email;
    this.roles = roles;
  }
}
