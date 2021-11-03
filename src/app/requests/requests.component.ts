import { Component, OnInit } from '@angular/core';
import {Request} from "../domains/request";
import {ActivatedRoute, Router} from "@angular/router";
import {RequestsService} from "../services/requests.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {Role} from "../domains/role";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  id: number;

  requests: Request[] = [];

  allSelect: any[];
  select: string = "All";
  isManager: boolean = false;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,private activateRoute: ActivatedRoute, private requestService: RequestsService, private route: Router) {
    this.id = activateRoute.snapshot.params['id'];
    this.allSelect = [{label: 'All', value: 'All'}, {label: 'cancelled', value: 'cancelled'},{label: 'confirmed', value: 'confirmed'},{label: 'unchecked', value: 'unchecked'}, {label: 'rejected', value: 'rejected'} ];
  }

  ngOnInit(): void {
    //@ts-ignore
    this.id = JSON.parse(window.atob(window.sessionStorage.getItem("auth-token").split('.')[1])).id;

    //@ts-ignore
    JSON.parse(window.atob(window.sessionStorage.getItem("auth-token").split('.')[1])).roles?.forEach(element => {
      if(element.name == "ROLE_MANAGER") this.isManager = true;
      if(this.isManager) this.requestService.getAllRequests().subscribe(res=>this.requests = res)
      else this.requestService.getUserRequests(this.id).subscribe(res=>this.requests = res)
    });
  }

  toViewing(id: number){
    this.route.navigateByUrl("requests/"+ id+"/viewing");
  }

  confirmCancelled(event: Event, id:number) {
    this.confirmationService.confirm({
      //@ts-ignore
      target: event.target,
      message: 'Cancelled this request?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.requestService.cancelledRequest(id).subscribe(()=>{
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

  confirmDelete(event: Event, id:number) {
    this.confirmationService.confirm({
      //@ts-ignore
      target: event.target,
      message: 'Delete this request?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.requestService.deleteRequest(id).subscribe(()=>{
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
    this.route.navigateByUrl('requests/add');
  }
  changeSelect(){
    if(!this.isManager) {
      switch (this.select) {
        case "All": {
          this.requestService.getUserRequests(this.id).subscribe(res => {
            this.requests = res;
          })
          break;
        }
        case "cancelled": {
          this.requestService.getUserRequestByStatus(this.id, 'cancelled').subscribe(res => {
            this.requests = res;
          })
          break;
        }
        case "confirmed": {
          this.requestService.getUserRequestByStatus(this.id, 'confirmed').subscribe(res => {
            this.requests = res;
          })
          break;
        }
        case "unchecked": {
          this.requestService.getUserRequestByStatus(this.id, 'unchecked').subscribe(res => {
            this.requests = res;
          })
          break;
        }
        case "rejected": {
          this.requestService.getUserRequestByStatus(this.id, 'rejected').subscribe(res => {
            this.requests = res;
          })
          break;
        }
      }
    }
    else {
      switch (this.select) {
        case "All": {
          this.requestService.getAllRequests().subscribe(res => {
            this.requests = res;
          })
          break;
        }
        case "cancelled": {
          this.requestService.getRequestsByStatus('cancelled').subscribe(res => {
            this.requests = res;
          })
          break;
        }
        case "confirmed": {
          this.requestService.getRequestsByStatus('confirmed').subscribe(res => {
            this.requests = res;
          })
          break;
        }
        case "unchecked": {
          this.requestService.getRequestsByStatus('unchecked').subscribe(res => {
            this.requests = res;
          })
          break;
        }
        case "rejected": {
          this.requestService.getRequestsByStatus('rejected').subscribe(res => {
            this.requests = res;
          })
          break;
        }
      }
    }
  }
}
