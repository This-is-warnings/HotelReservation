import { Component, OnInit } from '@angular/core';
import {User} from "../domains/user";
import {UsersService} from "../services/users.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  constructor(private route: Router, private confirmationService: ConfirmationService,private messageService: MessageService, private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(res=>{
      this.users = res;
    })
  }

  edit(id: number){
    this.route.navigateByUrl("users/edit/" + id);
  }

  add(){
    this.route.navigateByUrl("users/add");
  }

  confirmDelete(event: Event, id: number){
    this.confirmationService.confirm({
      //@ts-ignore
      target: event.target,
      message: 'Delete this user?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(id).subscribe(()=>{
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

}
