import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {PoidCourrierDto} from "./models";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class PoidCourrierService {
  apiName = 'poids';
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
  return this.httpClient.get<[PoidCourrierDto]>(this.api_host,this.httpOptions);
}
findTarifByPoidCourrier(poid:number): Observable<number>{
    return this.httpClient.get<any>(environment.api_host+'tarifPoidsCourrier/getTarif/'+poid,this.httpOptions);
}

  save(item: PoidCourrierDto)
{
  return this.httpClient.post(this.api_host,item,this.httpOptions);
}
delete(id:string)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.delete(new_api_host,this.httpOptions);
}
update(id:string, item:PoidCourrierDto)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.put<PoidCourrierDto>(new_api_host,item,this.httpOptions);
}

getOneById(id:string)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.get<PoidCourrierDto>(new_api_host,this.httpOptions);
}

getOne(id:string)
{
  let new_api_host = this.routerParam(this.api_host+'/getByreference',id);
  return this.httpClient.get<PoidCourrierDto>(new_api_host,this.httpOptions);
}

routerParam(host:string, param: string){
  return host + "/" + param;
}
}
