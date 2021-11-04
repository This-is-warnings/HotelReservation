import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];

  constructor(private router: Router) {
    this.items = [];
  }

  ngOnInit(): void {
    this.items = [
      {label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/home'},
    ];

    //@ts-ignore
    JSON.parse(window.atob(window.sessionStorage.getItem("auth-token").split('.')[1])).roles?.forEach(element => {
      if (element.name == 'ROLE_ADMIN'){
        this.items.push({
          label: 'Users',
          icon: 'pi pi-fw pi-user',
          routerLink: '/users'
        });

      }

      if (element.name == 'ROLE_CLIENT'){
        this.items.push({
          label: 'Cards',
          icon: 'pi pi-fw pi-credit-card',
          routerLink: '/cards'
        });

        this.items.push({
          label: 'Requests',
          icon: 'pi pi-fw pi-user',
          routerLink: '/requests'
        })

        this.items.push({
          label: 'Reserved rooms',
          icon: 'pi pi-fw pi-user',
          routerLink: '/reservedRooms'
        })

      }

      if(element.name == "ROLE_MANAGER"){
        this.items.push({
          label: 'Requests',
          icon: 'pi pi-fw pi-user',
          routerLink: '/requests'
        })

        this.items.push({
          label: 'Reserved rooms',
          icon: 'pi pi-fw pi-user',
          routerLink: '/reservedRooms'
        })

        this.items.push({
          label: 'Rooms',
          icon: 'pi pi-fw pi-user',
          routerLink: '/rooms'
        })

      }

    })

  }

  exit(): void {
    this.router.navigateByUrl('login');
  }
}
