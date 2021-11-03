import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {CardsService} from "../../services/cards.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {

  id: number = 0;

  number:string = '';

  constructor(private cardService: CardsService, private router: Router, private messageService: MessageService) {
  }

  ngOnInit(): void {
    //@ts-ignore
    this.id = JSON.parse(window.atob(window.sessionStorage.getItem("auth-token").split('.')[1])).id;
  }

  onSubmit(f: NgForm){
    this.cardService.addCardToUser(this.id, f.value.number).subscribe(()=>
    {
      this.router.navigateByUrl('/cards');
      setTimeout(()=>{
        this.messageService.add({severity:'info', summary:'Confirmed', detail:'Add'});
      }, 500);
    });
  }

}
