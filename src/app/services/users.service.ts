import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";
import {User} from "../domains/user";
import {Role} from "../domains/role";

const USERS_API = "http://localhost:8080/users"

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(USERS_API, this.tokenStorage.httpOptions);
  }

  updateUser(user: User): Observable<Object>{
    return this.http.put(USERS_API, user,this.tokenStorage.httpOptions);
  }

  addUser(user: User): Observable<Object>{
    return this.http.post(USERS_API, user,this.tokenStorage.httpOptions);
  }

  deleteUser(id: number): Observable<Object>{
    return this.http.delete(USERS_API + "/" + id, this.tokenStorage.httpOptions);
  }

  getAllRoles(): Observable<Role[]>{
    return this.http.get<Role[]>("http://localhost:8080/roles", this.tokenStorage.httpOptions);
  }

  getUserById(id: number): Observable<User>{
    return this.http.get<User>(USERS_API + '/' + id, this.tokenStorage.httpOptions);
  }

}
