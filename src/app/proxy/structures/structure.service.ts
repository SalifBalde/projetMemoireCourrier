import { environment } from 'src/environments/environment';
import type { CreateUpdateStructureDto, StructureDto } from './models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StructureService {
  apiName = 'structure';
  private api_host: string= environment.api_host + this.apiName;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    //  "Authorization" : "Bearer "+this.myToken
    })
  }
  constructor(private readonly httpClient : HttpClient) { }

  findAll()
{
  return this.httpClient.get<[StructureDto]>(environment.api_params+'structure',this.httpOptions);
}

  save(item: StructureDto)
{
  return this.httpClient.post(this.api_host,item,this.httpOptions);
}
delete(id:string)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.delete(new_api_host,this.httpOptions);
}
update(id:string, item:StructureDto)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.put<StructureDto>(new_api_host,item,this.httpOptions);
}

getOneById(id:string)
{
  let new_api_host = this.routerParam(this.apiName,id);
  return this.httpClient.get<StructureDto>(new_api_host,this.httpOptions);
}

getOne(id:string)
{
 // let new_api_host = this.routerParam(this.api_host+'/getByreference',id);
  return this.httpClient.get<StructureDto>(environment.api_params+ 'structure/'+id,this.httpOptions);
}

routerParam(host:string, param: string){
  return host + "/" + param;
}
}
