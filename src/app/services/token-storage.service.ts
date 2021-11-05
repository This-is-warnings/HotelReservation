import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {Role} from "../domains/role";

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  roles: Role[] = [];

  constructor() { }

  signOut(){
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    //@ts-ignore
    this.roles = JSON.parse(window.atob(window.sessionStorage.getItem("auth-token").split('.')[1])).roles;
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`}
      )
    };
  }

  public getRoles(): Role[]{
    return this.roles;
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`}
    )
  };

}
