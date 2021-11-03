import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {TokenStorageService} from "../services/token-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error = '';



  constructor(private tokenStorage:TokenStorageService, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {

  }

  onSubmit(f: NgForm) {
    this.authService.login(f.value.login,f.value.password).subscribe(
      data=>{
        console.log(data.token);
        this.tokenStorage.saveToken(data.token);
        this.router.navigateByUrl('home');
      },
      err=>{
        this.error = 'bad login or password';
      }
    )
  }

}
