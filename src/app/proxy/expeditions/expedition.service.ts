import { environment } from 'src/environments/environment';
import type { CreateUpdateExpeditionDto, ExpeditionDto } from './models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExpeditionService {
  apiName = 'expedition';
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
  return this.httpClient.get<[ExpeditionDto]>(this.api_host,this.httpOptions);
}

  save(item: ExpeditionDto)
{
  return this.httpClient.post(this.api_host,item,this.httpOptions);
}
delete(id:string)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.delete(new_api_host,this.httpOptions);
}
update(id:string, item:ExpeditionDto)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.put<ExpeditionDto>(new_api_host,item,this.httpOptions);
}

getOneById(id:string)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.get<ExpeditionDto>(new_api_host,this.httpOptions);
}

getAllByStrucuture(id:string)
{
  let new_api_host = this.routerParam(this.api_host+'/getAllByStructure',id);
  return this.httpClient.get<[ExpeditionDto]>(new_api_host,this.httpOptions);
}

getOne(id:string)
{
  let new_api_host = this.routerParam(this.api_host+'/getByreference',id);
  return this.httpClient.get<ExpeditionDto>(new_api_host,this.httpOptions);
}

routerParam(host:string, param: string){
  return host + "/" + param;
}
}
