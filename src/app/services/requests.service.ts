import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";
import {Card} from "../domains/card";
import {Request} from "../domains/request";

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
  }

  getUserRequests(id: number): Observable<Request[]> {
    return this.http.get<Request[]>('http://localhost:8080/requests/user/' + id, this.tokenStorage.httpOptions);
  }

  addRequest(request: Request): Observable<Object> {
    return this.http.post("http://localhost:8080/requests", request, this.tokenStorage.httpOptions);
  }

  cancelledRequest(id: number): Observable<Object>{
    return this.http.put("http://localhost:8080/requests/"+ id,'cancelled', this.tokenStorage.httpOptions);
  }

  rejectedRequest(id: number): Observable<Object>{
    return this.http.put("http://localhost:8080/requests/"+ id,'rejected', this.tokenStorage.httpOptions);
  }

  confirmedRequest(id: number): Observable<Object>{
    return this.http.put("http://localhost:8080/requests/"+ id,'confirmed', this.tokenStorage.httpOptions);
  }

  deleteRequest(id: number): Observable<Object>{
    return this.http.delete("http://localhost:8080/requests/"+ id, this.tokenStorage.httpOptions);
  }

  getUserRequestByStatus(id: number, status: string):Observable<Request[]>{
    return this.http.post<Request[]>("http://localhost:8080/requests/users/" + id + "/status", status, this.tokenStorage.httpOptions);
  }

  getAllRequests():Observable<Request[]>{
    return this.http.get<Request[]>("http://localhost:8080/requests", this.tokenStorage.httpOptions);
  }

  getRequestsByStatus(status: string):Observable<Request[]>{
    return this.http.post<Request[]>("http://localhost:8080/requests/status", status,this.tokenStorage.httpOptions);
  }

  getRequestById(id: number): Observable<Request>{
    return this.http.get<Request>("http://localhost:8080/requests/" + id, this.tokenStorage.httpOptions);
  }

}
