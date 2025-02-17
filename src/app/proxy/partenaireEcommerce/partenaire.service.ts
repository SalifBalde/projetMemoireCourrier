import { environment } from 'src/environments/environment';
import type { PartenaireEComDto } from './models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PartenaireEComService {
  apiName = 'partenaire_e_com';
  private api_host: string = environment.api_ecom+ this.apiName;
  myToken = sessionStorage.getItem("token");
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + this.myToken
    })
  };

  constructor(private readonly httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get<[PartenaireEComDto]>(this.api_host, this.httpOptions);
  }

  save(item: PartenaireEComDto) {
    return this.httpClient.post(this.api_host, item, this.httpOptions);
  }

  delete(id: string) {
    let new_api_host = this.routerParam(this.api_host, id);
    return this.httpClient.delete(new_api_host, this.httpOptions);
  }

  update(id: string, item: PartenaireEComDto) {
    let new_api_host = this.routerParam(this.api_host, id);
    return this.httpClient.put<PartenaireEComDto>(new_api_host, item, this.httpOptions);
  }

  getOneById(id: string) {
    let new_api_host = this.routerParam(this.api_host, id);
    return this.httpClient.get<PartenaireEComDto>(new_api_host, this.httpOptions);
  }

  getAllByStructure(id: string) {
    let new_api_host = this.routerParam(this.api_host + '/getAllByStructure', id);
    return this.httpClient.get<[PartenaireEComDto]>(new_api_host, this.httpOptions);
  }

  getOne(id: string) {
    let new_api_host = this.routerParam(this.api_host + '/getByreference', id);
    return this.httpClient.get<PartenaireEComDto>(new_api_host, this.httpOptions);
  }

  routerParam(host: string, param: string) {
    return `${host}/${param}`;
  }
}
