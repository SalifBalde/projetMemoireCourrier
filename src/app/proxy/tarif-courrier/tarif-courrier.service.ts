import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TarifCourrierCreateUpdateDto, TarifCourrierDto } from './models';

@Injectable({
  providedIn: 'root',
})
export class TarifCourrierService {
  apiName = 'tarif-poids-courrier';
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
  return this.httpClient.get<[TarifCourrierDto]>(this.api_host,this.httpOptions);
}



  save(item: TarifCourrierCreateUpdateDto)
{
  return this.httpClient.post(this.api_host,item,this.httpOptions);
}
delete(id:string)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.delete(new_api_host,this.httpOptions);
}
update(id:string, item:TarifCourrierCreateUpdateDto)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.put<TarifCourrierDto>(new_api_host,item,this.httpOptions);
}

getOneById(id:string)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.get<TarifCourrierDto>(new_api_host,this.httpOptions);
}

getOne(id:string)
{
  let new_api_host = this.routerParam(this.api_host+'/getByreference',id);
  return this.httpClient.get<TarifCourrierDto>(new_api_host,this.httpOptions);
}

getTarif(zoneId:number, poidsId :number)
{
  let new_api_host = this.routerParam(this.api_host+'/getTaxe',zoneId, poidsId);
  return this.httpClient.get<number>(new_api_host,this.httpOptions);
}

routerParam(baseUrl, ...params) {
    return `${baseUrl}/${params.join('/')}`;
}
}
