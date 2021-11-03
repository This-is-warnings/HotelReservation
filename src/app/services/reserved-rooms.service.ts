import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";
import {Request} from "../domains/request";
import {ReservedRoom} from "../domains/reserved-room";

@Injectable({
  providedIn: 'root'
})
export class ReservedRoomsService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }


  getUserReservedRooms(id: number): Observable<ReservedRoom[]>{
    return this.http.get<ReservedRoom[]>('http://localhost:8080/reservedRoom/users/' + id, this.tokenStorage.httpOptions);
  }

  deleteReservedRoom(id: number): Observable<Object>{
    return this.http.delete("http://localhost:8080/reservedRoom/"+id, this.tokenStorage.httpOptions);
  }

  cancelledReservedRoom(id: number): Observable<Object>{
    return this.http.put("http://localhost:8080/reservedRoom/"+id, 'cancelled', this.tokenStorage.httpOptions);
  }

  paidReservedRoom(id: number): Observable<Object>{
    return this.http.put("http://localhost:8080/reservedRoom/"+id, 'paid', this.tokenStorage.httpOptions);
  }

  getUserReservedRoomsByStatus(id: number, status: string): Observable<ReservedRoom[]>{
    return this.http.post<ReservedRoom[]>("http://localhost:8080/reservedRoom/users/" + id + "/status", status,this.tokenStorage.httpOptions);
  }

  getAllReservedRooms(): Observable<ReservedRoom[]>{
    return this.http.get<ReservedRoom[]>("http://localhost:8080/reservedRoom", this.tokenStorage.httpOptions);
  }

  getReservedRoomsByStatus(status: string): Observable<ReservedRoom[]>{
    return this.http.post<ReservedRoom[]>("http://localhost:8080/reservedRoom/status",status,this.tokenStorage.httpOptions);
  }

  addReservedRoom(reservedRoom: ReservedRoom): Observable<Object>{
    return this.http.post("http://localhost:8080/reservedRoom", reservedRoom, this.tokenStorage.httpOptions);
  }

}
