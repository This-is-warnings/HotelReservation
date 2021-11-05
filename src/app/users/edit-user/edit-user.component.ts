import { Component, OnInit } from '@angular/core';
import {User} from "../../domains/user";
import {UsersService} from "../../services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Role} from "../../domains/role";
import {MessageService} from "primeng/api";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  editUser: User = new User(0,'','','','','','',[]);

  allRoles: Role[] = [];

  errorEmail: boolean = false;

  constructor(private messageService: MessageService,private userService: UsersService, private activateRoute: ActivatedRoute, private route: Router) {
  }

  ngOnInit(): void {
    this.userService.getUserById(this.activateRoute.snapshot.params['id']).subscribe(res=>{
      this.editUser = res;
    })
    this.userService.getAllRoles().subscribe(res=>{
      this.allRoles = res;
    })
  }

  checkEmailError(){
    let isClient = false;
    let isManager = false;
    this.editUser.roles.forEach(r=>{
      if (r.name=='ROLE_CLIENT') isClient = true;
      if(r.name=='ROLE_MANAGER') isManager = true;
    })
    this.errorEmail = isClient && isManager;
  }

  onSubmit(f: NgForm){
    console.log(this.editUser)
    this.userService.updateUser(this.editUser).subscribe(()=>{
      this.route.navigateByUrl("users");
      setTimeout(()=>{
        this.messageService.add({severity:'info', summary:'Confirmed', detail:'Edit user' + this.editUser.id});
      }, 500);
    })
  }

}
