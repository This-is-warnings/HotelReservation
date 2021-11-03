import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Request} from "../../domains/request";
import {User} from "../../domains/user";
import {RequestsService} from "../../services/requests.service";
import {Router} from "@angular/router";
import {DialogUtility} from "@syncfusion/ej2-popups";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent implements OnInit {

  userId: number = 0;
  allClasses: any[];
  today: Date = new Date();
  value1: string = "C";

  constructor(private requestService: RequestsService, private route: Router, private messageService: MessageService) {
    this.allClasses = [{label: 'C', value: 'C'}, {label: 'B', value: 'B'},{label: 'A', value: 'A'},{label: 'Luxe', value: 'Luxe'} ];
  }

  ngOnInit(): void {
    // @ts-ignore
    this.userId = JSON.parse(window.atob(window.sessionStorage.getItem("auth-token").split('.')[1])).id;
  }

  onSubmit(f: NgForm){
    this.requestService.addRequest(new Request(0, f.value.numberOfRooms, f.value.roomClass,f.value.startDate, f.value.endDate, 'unchecked', new User(this.userId, '','','','','','',[]))).subscribe(()=>{
      this.route.navigateByUrl('requests');
      setTimeout(()=>{
        this.messageService.add({severity:'info', summary:'Confirmed', detail:'Add'});
      }, 500);
    });
  }

}
