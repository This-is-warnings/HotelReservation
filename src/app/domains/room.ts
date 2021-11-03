export class Room {
  id: number;
  number: number;
  numberOfRooms: number;
  roomClass: string;
  pricePerDay: number;

  constructor(id: number, number: number, numberOfRooms: number, roomClass: string, pricePerDay: number) {
    this.id = id;
    this.number = number;
    this.numberOfRooms = numberOfRooms;
    this.roomClass = roomClass;
    this.pricePerDay = pricePerDay;
  }
}
