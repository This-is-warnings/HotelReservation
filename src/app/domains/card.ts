import {User} from "./user";

export class Card {
  id: number;
  number: string;
  balance: number;
  user: User;

  constructor(id: number, number: string, balance: number, user: User) {
    this.id = id;
    this.number = number;
    this.balance = balance;
    this.user = user;
  }
}
