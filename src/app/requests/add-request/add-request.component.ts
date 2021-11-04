import { Component, OnInit } from '@angular/core';
import {NgForm, NgModel} from "@angular/forms";
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
  errorDateDiff = false;

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

  checkDateDifError(startDate1: NgModel, endDate1: NgModel){
    let startDate = new Date(startDate1.value);
    let endDate = new Date(endDate1.value);

    let dateDif = ((-1)*Math.floor((Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()) - Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) ) /(1000 * 60 * 60 * 24)));
    console.log(dateDif)
    this.errorDateDiff = dateDif < 1;
  }

}
