import { environment } from 'src/environments/environment';
import type { CourrierCreateUpdateDto, CourrierDto } from './models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientDto } from '../client';

@Injectable({
  providedIn: 'root',
})
export class CourrierService {
  apiName = 'courrier';
  private api_host: string= environment.api_host + this.apiName;
  myToken = sessionStorage.getItem("token");
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      "Authorization" : "Bearer "+this.myToken
    })
  }
  constructor(private readonly httpClient : HttpClient) { }

  findAll()
{
  return this.httpClient.get<[CourrierDto]>(this.api_host,this.httpOptions);
}

getAllDestinataires(clientId:string, destinationId:string) {
    let new_api_host = this.routerParam(this.api_host,'client',clientId,'destination', destinationId);
  return this.httpClient.get<ClientDto[]>(new_api_host,this.httpOptions);
}
  save(item: CourrierCreateUpdateDto)
{
  return this.httpClient.post(this.api_host,item,this.httpOptions);
}
delete(id:string)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.delete(new_api_host,this.httpOptions);
}
update(id:string, item:CourrierCreateUpdateDto)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.put<CourrierDto>(new_api_host,item,this.httpOptions);
}

getOneById(id:string)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.get<CourrierDto>(new_api_host,this.httpOptions);
}

getOne(id:string)
{
  let new_api_host = this.routerParam(this.api_host+'/getByreference',id);
  return this.httpClient.get<CourrierDto>(new_api_host,this.httpOptions);
}

private routerParam(baseUrl: string, ...params: string[]) {
    return `${baseUrl}/${params.join('/')}`;
  }
}
