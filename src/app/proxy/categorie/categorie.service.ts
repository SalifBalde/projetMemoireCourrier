import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Paysdto} from "../pays";
import {CategoeieDto} from "./model.";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private api_host = `${environment.api_host}categorieCourrier`;
  myToken = sessionStorage.getItem("token");
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      "Authorization" : "Bearer "+this.myToken
    })
  }

  constructor(private readonly httpClient : HttpClient) { }

  findAll() {
    return this.httpClient.get<[CategoeieDto]>(this.api_host, this.httpOptions);
  }

}
