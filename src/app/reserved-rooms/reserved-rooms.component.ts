import {Component, OnInit} from '@angular/core';
import {ReservedRoom} from "../domains/reserved-room";
import {CardsService} from "../services/cards.service";
import {ActivatedRoute} from "@angular/router";
import {ReservedRoomsService} from "../services/reserved-rooms.service";
import {Card} from "../domains/card";
import {User} from "../domains/user";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-reserved-rooms',
  templateUrl: './reserved-rooms.component.html',
  styleUrls: ['./reserved-rooms.component.css']
})
export class ReservedRoomsComponent implements OnInit {

  displayMaximizable: boolean = false;
  id: number = 0;
  reservedRooms: ReservedRoom[] = [];
  userCards: Card[] = []
  selectedCard: Card= new Card(0,'',0,new User(0, '','','','','','',[]));
  reservedRoomPrice: number = 0;
  selectedRoomId: number = 0;

  allSelect: any[];
  select: string = "All";

  isManager: boolean = false;


  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private reservedRoomsService: ReservedRoomsService, private activateRoute: ActivatedRoute, private cardService: CardsService) {
    this.allSelect = [{label: 'All', value: 'All'}, {label: 'paid', value: 'paid'},{label: 'unpaid', value: 'unpaid'},{label: 'cancelled', value: 'cancelled'} ];

  }

  ngOnInit(): void {
    // @ts-ignore
    this.id = JSON.parse(window.atob(window.sessionStorage.getItem("auth-token").split('.')[1])).id;

    //@ts-ignore
    JSON.parse(window.atob(window.sessionStorage.getItem("auth-token").split('.')[1])).roles?.forEach(element => {

      if(element.name == "ROLE_MANAGER") this.isManager = true;
      if(!this.isManager){
        this.reservedRoomsService.getUserReservedRooms(this.id).subscribe(res=>this.reservedRooms = res);
        this.cardService.getUserCards(this.id).subscribe(res => {
          this.userCards = res;
        })
        this.selectedCard = this.userCards[0];
      }
      else{
        this.reservedRoomsService.getAllReservedRooms().subscribe(res=>this.reservedRooms = res);
      }

    });
  }

  showMaximizableDialog(price: number, roomId: number) {
    this.reservedRoomPrice = price;
    this.displayMaximizable = true;
    this.selectedRoomId = roomId;
  }

  confirmDelete(event: Event, id: number) {
    this.confirmationService.confirm({
      //@ts-ignore
      target: event.target,
      message: 'Delete this reserved room?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.reservedRoomsService.deleteReservedRoom(id).subscribe(()=>{
          this.ngOnInit();
          setTimeout(()=>{
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'Delete'});
          }, 500);
        })
      },
      reject: () => {

      }
    });

  }


  confirmCancelled(event: Event, id: number) {
    this.confirmationService.confirm({
      //@ts-ignore
      target: event.target,
      message: 'Cancelled this reserved room?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.reservedRoomsService.cancelledReservedRoom(id).subscribe(()=>{
          this.ngOnInit();
          setTimeout(()=>{
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'Cancelled'});
          }, 500);
        })
      },
      reject: () => {

      }
    });

  }

  selected(){
    this.cardService.updateCardBalance(this.selectedCard.id, this.reservedRoomPrice * (-1)).subscribe(()=>{
      this.ngOnInit();
      setTimeout(()=>{
        this.messageService.add({severity:'info', summary:'Confirmed', detail:'Оплачено'});
      }, 500);
    });
    this.reservedRoomsService.paidReservedRoom(this.selectedRoomId).subscribe();
    this.displayMaximizable = false;
  }

  changeSelect(){
    if(!this.isManager) {
      switch (this.select) {
        case "All": {
          this.reservedRoomsService.getUserReservedRooms(this.id).subscribe(res => {
            this.reservedRooms = res;
          })
          break;
        }
        case "cancelled": {
          this.reservedRoomsService.getUserReservedRoomsByStatus(this.id, 'cancelled').subscribe(res => {
            this.reservedRooms = res;
          })
          break;
        }
        case "paid": {
          this.reservedRoomsService.getUserReservedRoomsByStatus(this.id, 'paid').subscribe(res => {
            this.reservedRooms = res;
          })
          break;
        }
        case "unpaid": {
          this.reservedRoomsService.getUserReservedRoomsByStatus(this.id, 'unpaid').subscribe(res => {
            this.reservedRooms = res;
          })
          break;
        }
      }
    }
    else{
      switch (this.select) {
        case "All": {
          this.reservedRoomsService.getAllReservedRooms().subscribe(res => {
            this.reservedRooms = res;
          })
          break;
        }
        case "cancelled": {
          this.reservedRoomsService.getReservedRoomsByStatus('cancelled').subscribe(res => {
            this.reservedRooms = res;
          })
          break;
        }
        case "paid": {
          this.reservedRoomsService.getReservedRoomsByStatus('paid').subscribe(res => {
            this.reservedRooms = res;
          })
          break;
        }
        case "unpaid": {
          this.reservedRoomsService.getReservedRoomsByStatus('unpaid').subscribe(res => {
            this.reservedRooms = res;
          })
          break;
        }
      }
    }
  }


}
