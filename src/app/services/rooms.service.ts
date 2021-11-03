import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";
import {Room} from "../domains/room";
import {Request} from "../domains/request";

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
  }

  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>("http://localhost:8080/rooms", this.tokenStorage.httpOptions);
  }

  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>("http://localhost:8080/rooms/" + id, this.tokenStorage.httpOptions);
  }

  addRoom(room: Room): Observable<Object> {
    return this.http.post("http://localhost:8080/rooms", room, this.tokenStorage.httpOptions);
  }

  updateRoom(room: Room): Observable<Object> {
    return this.http.put("http://localhost:8080/rooms", room, this.tokenStorage.httpOptions);
  }

  deleteRoom(id: number): Observable<Object> {
    return this.http.delete("http://localhost:8080/rooms/" + id, this.tokenStorage.httpOptions);
  }

  getSuitableRooms(request: Request): Observable<Room[]> {
    return this.http.post<Room[]>("http://localhost:8080/rooms/suitable", request, this.tokenStorage.httpOptions);
  }
}
