import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TarifServiceCreateUpdateDto, TarifServiceDto } from './models';

@Injectable({
  providedIn: 'root',
})
export class TarifServiceService {
  apiName = 'tarif-service';
  private api_host: string = environment.api_host + this.apiName;
  myToken = sessionStorage.getItem("token");

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.myToken
    })
  };

  constructor(private readonly httpClient: HttpClient) {}

  findAll() {
    return this.httpClient.get<TarifServiceDto[]>(this.api_host, this.httpOptions);
  }

  save(item: TarifServiceCreateUpdateDto) {
    return this.httpClient.post<TarifServiceDto>(this.api_host, item, this.httpOptions);
  }

  delete(id: string) {
    let new_api_host = this.routerParam(this.api_host, id);
    return this.httpClient.delete(new_api_host, this.httpOptions);
  }

  update(id: string, item: TarifServiceCreateUpdateDto) {
    let new_api_host = this.routerParam(this.api_host, id);
    return this.httpClient.put<TarifServiceDto>(new_api_host, item, this.httpOptions);
  }

  getOneById(id: string) {
    let new_api_host = this.routerParam(this.api_host, id);
    return this.httpClient.get<TarifServiceDto>(new_api_host, this.httpOptions);
  }

  getTaxeByZoneAndService(zoneId: string, serviceId: string) {
    let new_api_host = this.routerParam(this.api_host + '/getTaxe', zoneId, serviceId);
    return this.httpClient.get<number>(new_api_host, this.httpOptions);
  }

  private routerParam(baseUrl: string, ...params: string[]) {
    return `${baseUrl}/${params.join('/')}`;
  }
}
