import { Component, OnInit } from '@angular/core';
import {Room} from "../domains/room";
import {RoomsService} from "../services/rooms.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms: Room[] = [];

  constructor(private route: Router, private messageService: MessageService, private roomService: RoomsService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.roomService.getAllRooms().subscribe(res=>{
      this.rooms = res;
    })
  }

  edit(id: number){
    this.route.navigateByUrl('rooms/edit/'+id);
  }

  confirmDelete(event: Event, id: number){
    this.confirmationService.confirm({
      //@ts-ignore
      target: event.target,
      message: 'Delete this room?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.roomService.deleteRoom(id).subscribe(()=>{
          this.ngOnInit();
          setTimeout(()=>{
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'Deleted'});
          }, 500);
        })
      },
      reject: () => {

      }
    });
  }

  add(){
    this.route.navigateByUrl('rooms/add');
  }


}
