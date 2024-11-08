import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ClientDto } from './models';

@Injectable({
    providedIn: 'root',
})
export class ClientService {
    private api_host = `${environment.api_params}client`;
    myToken = sessionStorage.getItem("token");
    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "Authorization" : "Bearer "+this.myToken
      })
    }
    constructor(private readonly httpClient : HttpClient) { }


    searchClient(keyword: string): Observable<ClientDto> {
        return this.httpClient.get<ClientDto>(`${this.api_host}/getByCniOrTelephone/${keyword}`)
    }


    save(item: ClientDto)
    {
      return this.httpClient.post(this.api_host,item,this.httpOptions);
    }


    update(id:string, item:ClientDto)
    {
      let new_api_host = this.routerParam(this.api_host,id);
      return this.httpClient.put<ClientDto>(new_api_host,item,this.httpOptions);
    }



routerParam(host:string, param: string){
    return host + "/" + param;
  }
}

export class ClientStorageService {
    private clientDetails: ClientDto;

    constructor() { }
    setClientDetails(clientDetails: ClientDto): void {
        this.clientDetails = clientDetails;
    }

    getClientDetails(): ClientDto {
        return this.clientDetails;
    }



}
