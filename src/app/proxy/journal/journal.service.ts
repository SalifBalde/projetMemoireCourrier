import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import {  JournalResultDto } from "./models";

@Injectable({
    providedIn: 'root',
})
export class JournalService{
    apiName = 'journal';
  private api_host: string = environment.api_compta + this.apiName;
  myToken = sessionStorage.getItem("token");

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + this.myToken
    })
  };

  constructor(private readonly httpClient: HttpClient) { }


// Récupérer une action pp ID
getJournalToday(id: string,userId:string) {
    const new_api_host = this.routerParam(this.api_host,"journal-today", id, userId);
    return this.httpClient.get<JournalResultDto>(new_api_host, this.httpOptions);
  }

  // Utilitaire pour ajouter des paramètres à l'URL
  routerParam(baseUrl: string, ...params: string[]): string {
    return `${baseUrl}/${params.join('/')}`;
  }
}
