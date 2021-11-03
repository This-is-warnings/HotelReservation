import {Injectable} from '@angular/core';
import {TokenStorageService} from "./token-storage.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Card} from "../domains/card";

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
  }

  getUserCards(id: number): Observable<Card[]> {
    return this.http.get<Card[]>('http://localhost:8080/users/' + id + '/cards', this.tokenStorage.httpOptions);
  }

  addCardToUser(id: number, number: string): Observable<Object> {
    console.log( id + "  " + number);
    return this.http.post("http://localhost:8080/users/" + id + "/cards", number, this.tokenStorage.httpOptions);
  }

  updateCardBalance(cardId: number, sum: number): Observable<Object>{
    console.log(cardId + '  ' + sum);
    return this.http.put("http://localhost:8080/users/" + cardId + "/cards", sum, this.tokenStorage.httpOptions)
  }

  deleteCard(id: number): Observable<Object>{
    console.log('cardId ' + id);
    return this.http.delete("http://localhost:8080/users/" + id + "/cards", this.tokenStorage.httpOptions);
  }
}
