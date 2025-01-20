import { environment } from 'src/environments/environment';
import type { EtatEcomDto } from './models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StatusEcomService {
  apiName = 'etat_ecom';
  private api_host: string = environment.api_ecom + this.apiName;
  myToken = sessionStorage.getItem("token");
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + this.myToken
    })
  };

  constructor(private readonly httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get<[EtatEcomDto]>(this.api_host, this.httpOptions);
  }

  save(item: EtatEcomDto) {
    return this.httpClient.post(this.api_host, item, this.httpOptions);
  }

  delete(id: number) {
    let new_api_host = this.routerParam(this.api_host, id.toString());
    return this.httpClient.delete(new_api_host, this.httpOptions);
  }

  update(id: number, item: EtatEcomDto) {
    let new_api_host = this.routerParam(this.api_host, id.toString());
    return this.httpClient.put<EtatEcomDto>(new_api_host, item, this.httpOptions);
  }

  getOneById(id: number) {
    let new_api_host = this.routerParam(this.api_host, id.toString());
    return this.httpClient.get<EtatEcomDto>(new_api_host, this.httpOptions);
  }

  routerParam(host: string, param: string) {
    return `${host}/${param}`;
  }
}
