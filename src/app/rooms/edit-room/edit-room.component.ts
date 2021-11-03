import { Component, OnInit } from '@angular/core';
import {Room} from "../../domains/room";
import {RoomsService} from "../../services/rooms.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {

  editRoom: Room = new Room(0,0,0,'',0);

  roomId: number;

  allClasses: any[];

  constructor(private roomService: RoomsService, private messageService: MessageService, private route: Router, private activateRoute: ActivatedRoute) {
    //@ts-ignore
    this.roomId = this.activateRoute.snapshot.params['id'];
    this.allClasses = [{label: 'C', value: 'C'}, {label: 'B', value: 'B'},{label: 'A', value: 'A'},{label: 'Luxe', value: 'Luxe'} ];
  }

  ngOnInit(): void {
    this.roomService.getRoomById(this.roomId).subscribe(res=>{
      this.editRoom = res;
    })
  }

  onSubmit(){
    this.roomService.updateRoom(this.editRoom).subscribe(()=>{
      this.route.navigateByUrl('rooms');
      setTimeout(()=>{
        this.messageService.add({severity:'info', summary:'Confirmed', detail:'Update'});
      }, 500);
    })
  }


}
