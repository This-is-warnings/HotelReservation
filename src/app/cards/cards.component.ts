import { Component, OnInit } from '@angular/core';
import {Card} from "../domains/card";
import {CardsService} from "../services/cards.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogUtility} from "@syncfusion/ej2-popups";
import alert = DialogUtility.alert;
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  id: number = 0;

  cards: Card[] = [];

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,private router: Router, private cardService: CardsService, private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.id = JSON.parse(window.atob(window.sessionStorage.getItem("auth-token").split('.')[1])).id;
    this.cardService.getUserCards(this.id).subscribe(res=>this.cards = res);
  }

  topUp(id:number){
    this.router.navigateByUrl("cards/" + id+"/topUp")
  }
  confirm(event: Event, id: number) {
    this.confirmationService.confirm({
      //@ts-ignore
      target: event.target,
      message: 'Delete this card?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cardService.deleteCard(id).subscribe(()=>{
          this.ngOnInit();
          setTimeout(()=>{
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'Add'});
          }, 500);
        })
      },
      reject: () => {

      }
    });
  }
  add(){
    this.router.navigateByUrl("cards/add");
  }

}
