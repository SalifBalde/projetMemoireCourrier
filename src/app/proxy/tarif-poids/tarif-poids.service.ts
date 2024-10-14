import { environment } from 'src/environments/environment';
import type {  DistanceLookupDto, PoidsLookupDto, TarifPoidsCreateUpdateDto, TarifPoidsDto } from './models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TarifPoidsService {
  apiName = 'tarifpoids';
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
  return this.httpClient.get<[TarifPoidsDto]>(this.api_host,this.httpOptions);
}

getPoidsLookup(){
    return this.httpClient.get<[PoidsLookupDto]>(this.api_host+'/getpoidslookup',this.httpOptions);
}

getDistanceLookup(){
    return this.httpClient.get<[DistanceLookupDto]>(this.api_host+'/getdistancelookup',this.httpOptions);
}

  save(item: TarifPoidsCreateUpdateDto)
{
  return this.httpClient.post(this.api_host,item,this.httpOptions);
}
delete(id:string)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.delete(new_api_host,this.httpOptions);
}
update(id:string, item:TarifPoidsCreateUpdateDto)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.put<TarifPoidsDto>(new_api_host,item,this.httpOptions);
}

getOneById(id:string)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.get<TarifPoidsDto>(new_api_host,this.httpOptions);
}

getOne(id:string)
{
  let new_api_host = this.routerParam(this.api_host+'/getByreference',id);
  return this.httpClient.get<TarifPoidsDto>(new_api_host,this.httpOptions);
}

getTarif(distance:string, idPoids :string)
{
  let new_api_host = this.routerParam(this.api_host+'/findByDistanceAndPoids',distance, idPoids);
  return this.httpClient.get<TarifPoidsDto>(new_api_host,this.httpOptions);
}

routerParam(baseUrl, ...params) {
    return `${baseUrl}/${params.join('/')}`;
}
}
