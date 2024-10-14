import { environment } from 'src/environments/environment';
import type {UserDto } from './models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiName = 'user';
  private api_host: string= environment.api_params + this.apiName;
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
  return this.httpClient.get<[UserDto]>(this.api_host,this.httpOptions);
}

findAllByStructure(id:string)
{
    let new_api_host = this.routerParam(this.api_host+'/getAllByStructure',id);
    return this.httpClient.get<[UserDto]>(new_api_host,this.httpOptions);
}

  save(item: UserDto)
{
  return this.httpClient.post(this.api_host,item,this.httpOptions);
}
delete(id:string)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.delete(new_api_host,this.httpOptions);
}
update(id:string, item:UserDto)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.put<UserDto>(new_api_host,item,this.httpOptions);
}

getOneById(id:string)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.get<UserDto>(new_api_host,this.httpOptions);
}

findByEmail(email:string)
{
  let new_api_host = this.routerParam(this.api_host+'/findByEmail',email);
  return this.httpClient.get<UserDto>(new_api_host,this.httpOptions);
}

routerParam(host:string, param: string){
  return host + "/" + param;
}
}
