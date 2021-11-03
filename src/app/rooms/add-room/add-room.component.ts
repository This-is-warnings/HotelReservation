import { Component, OnInit } from '@angular/core';
import {RoomsService} from "../../services/rooms.service";
import {NgForm} from "@angular/forms";
import {Room} from "../../domains/room";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {

  allClasses: any[];
  value1: string = "C";


  constructor(private roomService: RoomsService, private messageService: MessageService, private route: Router) {
    this.allClasses = [{label: 'C', value: 'C'}, {label: 'B', value: 'B'},{label: 'A', value: 'A'},{label: 'Luxe', value: 'Luxe'} ];
  }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){
    this.roomService.addRoom(new Room(0, f.value.number,f.value.numberOfRooms,f.value.roomClass, f.value.pricePerDay)).subscribe(res=>{
      this.route.navigateByUrl('/rooms');
      setTimeout(()=>{
        this.messageService.add({severity:'info', summary:'Confirmed', detail:'Add'});
      }, 500);
    })
  }

}
