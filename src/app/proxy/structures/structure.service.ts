import { environment } from 'src/environments/environment';
import type { CreateUpdateStructureDto, StructureDto } from './models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StructureService {
  apiName = 'structure';
  private api_host: string = environment.api_params + this.apiName;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //  "Authorization" : "Bearer "+this.myToken
    })
  }
  constructor(private readonly httpClient: HttpClient) { }


  getOneById(id: string) {
    let new_api_host = this.routerParam(this.apiName, id);
    return this.httpClient.get<StructureDto>(new_api_host, this.httpOptions);
  }

  getOne(id: string) {
    // let new_api_host = this.routerParam(this.api_host+'/getByreference',id);
    return this.httpClient.get<StructureDto>(environment.api_params + 'structure/' + id, this.httpOptions);
  }

  getBureaux()
{
  let new_api_host = this.routerParam(this.api_host,'get-bureaux');
  return this.httpClient.get<StructureDto[]>(new_api_host,this.httpOptions);
}

  routerParam(host: string, param: string) {
    return host + "/" + param;
  }
}
