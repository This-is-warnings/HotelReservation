import { Component, OnInit } from '@angular/core';
import {CardsService} from "../../services/cards.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-top-up-card',
  templateUrl: './top-up-card.component.html',
  styleUrls: ['./top-up-card.component.css']
})
export class TopUpCardComponent implements OnInit {

  cardId: number = 0;

  constructor(private cardService: CardsService, private activateRoute: ActivatedRoute, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.cardId = this.activateRoute.snapshot.params['id'];
  }

  onSubmit(f: NgForm){
    this.cardService.updateCardBalance(this.cardId,f.value.sum).subscribe(()=>
    {
      this.router.navigateByUrl('/cards');
      setTimeout(()=>{
        this.messageService.add({severity:'info', summary:'Confirmed', detail:'Update'});
      }, 500);
    });
  }

}
