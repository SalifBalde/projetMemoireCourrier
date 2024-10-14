import { environment } from 'src/environments/environment';
import type { CreateUpdateDistanceBureauDto, DistanceBureauDto } from './models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DistanceBureauService {
  apiName = 'distance-bureau';
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
  return this.httpClient.get<[DistanceBureauDto]>(this.api_host,this.httpOptions);
}

  save(item: DistanceBureauDto)
{
  return this.httpClient.post(this.api_host,item,this.httpOptions);
}
delete(id:string)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.delete(new_api_host,this.httpOptions);
}
update(id:string, item:DistanceBureauDto)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.put<DistanceBureauDto>(new_api_host,item,this.httpOptions);
}

getOneById(id:string)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.get<DistanceBureauDto>(new_api_host,this.httpOptions);
}

getOne(id:string)
{
  let new_api_host = this.routerParam(this.api_host+'/getByreference',id);
  return this.httpClient.get<DistanceBureauDto>(new_api_host,this.httpOptions);
}

getDistance(id:string, idd: string)
{
  let new_api_host = this.routerParam(this.api_host+'/distance',id, idd);
  return this.httpClient.get<DistanceBureauDto>(new_api_host,this.httpOptions);
}

routerParam(baseUrl, ...params) {
    return `${baseUrl}/${params.join('/')}`;
}

}
