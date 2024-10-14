import { environment } from 'src/environments/environment';
import type { CreateUpdateVehiculeDto, VehiculeDto } from './models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VehiculeService {
  apiName = 'vehicule';
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
  return this.httpClient.get<[VehiculeDto]>(this.api_host,this.httpOptions);
}

  save(item: VehiculeDto)
{
  return this.httpClient.post(this.api_host,item,this.httpOptions);
}
delete(id:string)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.delete(new_api_host,this.httpOptions);
}
update(id:string, item:VehiculeDto)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.put<VehiculeDto>(new_api_host,item,this.httpOptions);
}

getOneById(id:string)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.get<VehiculeDto>(new_api_host,this.httpOptions);
}

getOne(id:string)
{
  let new_api_host = this.routerParam(this.api_host+'/getByreference',id);
  return this.httpClient.get<VehiculeDto>(new_api_host,this.httpOptions);
}

routerParam(host:string, param: string){
  return host + "/" + param;
}
}
