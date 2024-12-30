import { environment } from 'src/environments/environment';
import type { CategorieCreateUpdateDto, CategorieDto } from './models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  apiName = 'categorie-courrier';
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
  return this.httpClient.get<[CategorieDto]>(this.api_host,this.httpOptions);
}

  save(item: CategorieCreateUpdateDto)
{
  return this.httpClient.post(this.api_host,item,this.httpOptions);
}
delete(id:string)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.delete(new_api_host,this.httpOptions);
}
update(id:string, item:CategorieCreateUpdateDto)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.put<CategorieDto>(new_api_host,item,this.httpOptions);
}

getOneById(id:string)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.get<CategorieDto>(new_api_host,this.httpOptions);
}

getAllByRegimeAndType(regimeId:number,typeId: number)
{
  let new_api_host = this.routerParam(this.api_host,'regime',regimeId,'type-courrier',typeId);
  return this.httpClient.get<CategorieDto[]>(new_api_host,this.httpOptions);
}

routerParam(baseUrl, ...params) {
    return `${baseUrl}/${params.join('/')}`;
}


}
