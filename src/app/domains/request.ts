import {User} from "./user";

export class Request {
  id: number;
  numberOfRooms: number;
  roomClass: string;
  startDate: Date;
  endDate: Date;
  status: string;
  user: User;

  constructor(id: number, numberOfRooms: number, roomClass: string, startDate: Date, endDate: Date, status: string, user: User) {
    this.id = id;
    this.numberOfRooms = numberOfRooms;
    this.roomClass = roomClass;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    this.user = user;
  }
}
