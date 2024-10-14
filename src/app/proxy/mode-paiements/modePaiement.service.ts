import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModePaiementDto } from './models';

@Injectable({
  providedIn: 'root',
})
export class ModePaiementService {
  apiName = 'modePaiement';
  private api_host: string= environment.api_params + this.apiName;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  }
  constructor(private readonly httpClient : HttpClient) { }

  findAll()
{
  return this.httpClient.get<[ModePaiementDto]>(this.api_host,this.httpOptions);
}


getOneById(id:string)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.get<ModePaiementDto>(new_api_host,this.httpOptions);
}

routerParam(host:string, param: string){
  return host + "/" + param;
}
}
