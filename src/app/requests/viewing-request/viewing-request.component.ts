import { Component, OnInit } from '@angular/core';
import {RequestsService} from "../../services/requests.service";
import {Request} from "../../domains/request";
import {User} from "../../domains/user";
import {ActivatedRoute, Router} from "@angular/router";
import {Room} from "../../domains/room";
import {RoomsService} from "../../services/rooms.service";
import {ReservedRoomsService} from "../../services/reserved-rooms.service";
import {ReservedRoom} from "../../domains/reserved-room";
import {MessageService} from "primeng/api";

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

  constructor(private route: Router, private messageService: MessageService, private reservedRoomService: ReservedRoomsService, private roomService: RoomsService, private activateRoute: ActivatedRoute, private requestService: RequestsService){
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
   // console.log(Math.floor((Date.UTC(this.requests[0].startDate.getFullYear(), this.requests[0].startDate.getMonth(), this.requests[0].startDate.getDate()) - Date.UTC(this.requests[0].endDate.getFullYear(), this.requests[0].endDate.getMonth(), this.requests[0].endDate.getDate()) ) /(1000 * 60 * 60 * 24)) )
    //this.reservedRoomService.addReservedRoom(new ReservedRoom(0,))
    let startDate = new Date(this.requests[0].startDate);
    let endDate = new Date(this.requests[0].endDate);

    let dateDif =1 + ((-1)*Math.floor((Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()) - Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) ) /(1000 * 60 * 60 * 24)));
    console.log(dateDif + 1);
    this.reservedRoomService.addReservedRoom(new ReservedRoom(0, dateDif*this.selectedRoom.pricePerDay, "unpaid", startDate, endDate,
      this.requests[0].user, this.selectedRoom)).subscribe(res=>{
      this.requestService.confirmedRequest(this.requests[0].id).subscribe();
      this.route.navigateByUrl('requests');
      setTimeout(()=>{
        this.messageService.add({severity:'info', summary:'Confirmed', detail:'Reserved room add'});
      }, 500);
    });
  }

  rejected(){
    this.requestService.rejectedRequest(this.requests[0].id).subscribe(()=>{
      this.route.navigateByUrl('requests');
      setTimeout(()=>{
        this.messageService.add({severity:'info', summary:'Confirmed', detail:'Request ejected'});
      }, 500);
    })
  }

}
