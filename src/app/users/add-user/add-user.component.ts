import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Role} from "../../domains/role";
import {UsersService} from "../../services/users.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {User} from "../../domains/user";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  allRoles: Role[] = [];

  selectedRoles: Role[] = [];

  errorEmail: boolean = false;

  constructor(private userService: UsersService, private messageService: MessageService, private route: Router) { }

  ngOnInit(): void {
    this.userService.getAllRoles().subscribe(res=>{
      this.allRoles = res;
    })
  }
  checkEmailError(){
    let isClient = false;
    let isManager = false;
    this.selectedRoles.forEach(r=>{
      if (r.name=='ROLE_CLIENT') isClient = true;
      if(r.name=='ROLE_MANAGER') isManager = true;
    })
    this.errorEmail = isClient && isManager;
  }

  onSubmit(f: NgForm){
    this.userService.addUser(
      new User(0,f.value.login, f.value.password, f.value.name, f.value.surname, f.value.middlename, f.value.email,this.selectedRoles)
    ).subscribe(()=>{
      this.route.navigateByUrl("users");
      setTimeout(()=>{
        this.messageService.add({severity:'info', summary:'Confirmed', detail:'Add user'});
      }, 500);
    })
  }

}
