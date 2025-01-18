

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EcommerceDto, EcommerceSearchResultDto } from './models';
@Injectable({
  providedIn: 'root',
})
export class EcommerceService {
  apiName = 'ecommerce';
  private api_host: string = environment.api_ecom + this.apiName;
  myToken = sessionStorage.getItem("token");

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.myToken,
    }),
  };

  constructor(private readonly httpClient: HttpClient) {}

  findAll() {
    return this.httpClient.get<EcommerceDto[]>(this.api_host, this.httpOptions);
  }

  getOne(id: string) {
    const new_api_host = this.routerParam(this.api_host, id);
    return this.httpClient.get<EcommerceDto>(new_api_host, this.httpOptions);
  }

  findEcommerceByStatus(id: string, bureauId: number) {
    const url = this.routerParam(this.api_host, 'findEcommerceByStatus', id, bureauId.toString());
    return this.httpClient.post<EcommerceSearchResultDto[]>(url, this.httpOptions);
  }

  findEcommerceByDestinationReception(id: number) {
    const new_api_host = this.routerParam(this.api_host, 'findEcommerceByDestinationReception', id.toString());
    return this.httpClient.get<EcommerceSearchResultDto[]>(new_api_host, this.httpOptions);
  }

  findEcommerceFromReceptionToExpedition(id: number) {
    const new_api_host = this.routerParam(this.api_host, 'findEcommerceFromReceptionToExpedition', id.toString());
    return this.httpClient.get<EcommerceSearchResultDto[]>(new_api_host, this.httpOptions);
  }
  
  findEcommerceALivrer(id: number) {
    const new_api_host = this.routerParam(this.api_host, 'findEcommerceALivrer', id.toString());
    return this.httpClient.get<EcommerceSearchResultDto[]>(new_api_host, this.httpOptions);
  }

  livrer(id: number): Observable<EcommerceDto> {
    const url = `${this.api_host}/livrerEnvoieEcommerce/${id}`;

    return this.httpClient.put<EcommerceDto>(url, {}, this.httpOptions);
  }

  findEcommerceReceptionCt() {
    const new_api_host = this.routerParam(this.api_host, 'findEcommerceReceptionCt');
    return this.httpClient.get<EcommerceSearchResultDto[]>(new_api_host, this.httpOptions);
  }

  findEcommerceExpeditionCt() {
    const new_api_host = this.routerParam(this.api_host, 'findEcommerceExpeditionCt');
    return this.httpClient.get<EcommerceSearchResultDto[]>(new_api_host, this.httpOptions);
  }
  findEcommerceByCriteres(search: EcommerceDto) {
      const new_api_host = this.routerParam(this.api_host, 'rechercheParCritere');
      return this.httpClient.post<EcommerceSearchResultDto[]>(new_api_host, search, this.httpOptions);
    }

  reception(id: string, idStructure: string) {
    let new_api_host = this.routerParam(this.api_host+'/reception', id,idStructure);
    return this.httpClient.get(new_api_host, this.httpOptions);
  }

  save(item: EcommerceDto) {
    return this.httpClient.post<EcommerceDto>(this.api_host, item, this.httpOptions);
  }

  update(id: string, item: EcommerceDto) {
    const new_api_host = this.routerParam(this.api_host, id);
    return this.httpClient.put<EcommerceDto>(new_api_host, item, this.httpOptions);
  }

  delete(id: string) {
    const new_api_host = this.routerParam(this.api_host, id);
    return this.httpClient.delete(new_api_host, this.httpOptions);
  }

  routerParam(baseUrl, ...params) {
    return `${baseUrl}/${params.join('/')}`;
  }
}
