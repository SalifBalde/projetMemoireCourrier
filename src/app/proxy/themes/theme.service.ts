import { environment } from 'src/environments/environment';
<<<<<<<< HEAD:src/app/proxy/courrier/courrier.service.ts
import type { CourrierCreateUpdateDto, CourrierDto } from './models';
========
import type { CreateUpdateThemeDto, ThemeDto } from './models';
>>>>>>>> Seny:src/app/proxy/themes/theme.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
<<<<<<<< HEAD:src/app/proxy/courrier/courrier.service.ts
export class CourrierService {
  apiName = 'courrier';
========
export class ThemeService {
  apiName = 'theme';
>>>>>>>> Seny:src/app/proxy/themes/theme.service.ts
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
<<<<<<<< HEAD:src/app/proxy/courrier/courrier.service.ts
  return this.httpClient.get<[CourrierDto]>(this.api_host,this.httpOptions);
}

  save(item: CourrierCreateUpdateDto)
========
  return this.httpClient.get<[ThemeDto]>(this.api_host,this.httpOptions);
}

  save(item: ThemeDto)
>>>>>>>> Seny:src/app/proxy/themes/theme.service.ts
{
  return this.httpClient.post(this.api_host,item,this.httpOptions);
}
delete(id:string)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.delete(new_api_host,this.httpOptions);
}
<<<<<<<< HEAD:src/app/proxy/courrier/courrier.service.ts
update(id:string, item:CourrierCreateUpdateDto)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.put<CourrierDto>(new_api_host,item,this.httpOptions);
========
update(id:string, item:ThemeDto)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.put<ThemeDto>(new_api_host,item,this.httpOptions);
>>>>>>>> Seny:src/app/proxy/themes/theme.service.ts
}

getOneById(id:string)
{
  let new_api_host = this.routerParam(this.api_host,id);
<<<<<<<< HEAD:src/app/proxy/courrier/courrier.service.ts
  return this.httpClient.get<CourrierDto>(new_api_host,this.httpOptions);
========
  return this.httpClient.get<ThemeDto>(new_api_host,this.httpOptions);
>>>>>>>> Seny:src/app/proxy/themes/theme.service.ts
}

getOne(id:string)
{
  let new_api_host = this.routerParam(this.api_host+'/getByreference',id);
<<<<<<<< HEAD:src/app/proxy/courrier/courrier.service.ts
  return this.httpClient.get<CourrierDto>(new_api_host,this.httpOptions);
========
  return this.httpClient.get<ThemeDto>(new_api_host,this.httpOptions);
>>>>>>>> Seny:src/app/proxy/themes/theme.service.ts
}

routerParam(host:string, param: string){
  return host + "/" + param;
}
}
