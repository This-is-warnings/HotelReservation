import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageService} from "../services/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {

  constructor(private tokenStorage: TokenStorageService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let b = false;
    console.log(this.tokenStorage.getRoles());
    this.tokenStorage.getRoles().forEach(r => {
      if (r.name == "ROLE_CLIENT") b = true;
      console.log(r.name);
    })
    console.log('b ' + b);
    if (!b) {
      return this.router.parseUrl('/home')
    } else return true;
  }

}
