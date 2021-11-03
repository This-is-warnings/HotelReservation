import { Component, OnInit } from '@angular/core';
import {RequestsService} from "../../services/requests.service";
import {Request} from "../../domains/request";
import {User} from "../../domains/user";
import {ActivatedRoute} from "@angular/router";
import {Room} from "../../domains/room";
import {RoomsService} from "../../services/rooms.service";
import {ReservedRoomsService} from "../../services/reserved-rooms.service";
import {ReservedRoom} from "../../domains/reserved-room";

@Component({
  selector: 'app-viewing-request',
  templateUrl: './viewing-request.component.html',
  styleUrls: ['./viewing-request.component.css']
})
export class ViewingRequestComponent implements OnInit {

  requests: Request[]= [];

  suitableRooms: Room[] = [];

  selectedRoom: Room = new Room(0,0,0,'',0);

  id: number;

  constructor(private reservedRoomService: ReservedRoomsService, private roomService: RoomsService, private activateRoute: ActivatedRoute, private requestService: RequestsService){
    this.id = this.activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.requestService.getRequestById(this.id).subscribe(res=>{
      this.requests.push(res);
      this.roomService.getSuitableRooms(this.requests[0]).subscribe(res=>{
        this.suitableRooms = res;
      })
    })
  }

  selected(){
    //this.requests[0].startDate
    console.log(Math.floor((Date.UTC(this.requests[0].startDate.getFullYear(), this.requests[0].startDate.getMonth(), this.requests[0].startDate.getDate()) - Date.UTC(this.requests[0].endDate.getFullYear(), this.requests[0].endDate.getMonth(), this.requests[0].endDate.getDate()) ) /(1000 * 60 * 60 * 24)) )
    //this.reservedRoomService.addReservedRoom(new ReservedRoom(0,))
  }

}
