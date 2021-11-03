import {User} from "./user";
import {Room} from "./room";

export class ReservedRoom {
  id: number;
  price: number;
  status: String;
  startDate: Date;
  endDate: Date;
  user: User;
  room: Room;

  constructor(id: number, price: number, status: string, startDate: Date, endDate: Date,
              user: User, room: Room) {
    this.id = id;
    this.price = price;
    this.status = status;
    this.startDate = startDate;
    this.endDate = endDate;
    this.user = user;
    this.room = room;
  }
}
