import { environment } from 'src/environments/environment';
import type { CreateUpdateProduitDto, ProduitDto } from './models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {TypeProduitDto} from "../type-produits";
import {ThemeDto} from "../themes";

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  apiName = 'produit';
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
  return this.httpClient.get<[ProduitDto]>(this.api_host,this.httpOptions);
}

  save(item: ProduitDto)
{
  return this.httpClient.post(this.api_host,item,this.httpOptions);
}
delete(id:string)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.delete(new_api_host,this.httpOptions);
}
update(id:string, item:ProduitDto)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.put<ProduitDto>(new_api_host,item,this.httpOptions);
}

getOneById(id:string) {
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.get<ProduitDto>(new_api_host,this.httpOptions);
}
    getThemes(themeId:string) {
        let new_api_host = this.routerParam(this.api_host,themeId);
        return this.httpClient.get<ThemeDto[]>(new_api_host,this.httpOptions);
    }

    getTypeProduits(tytpeProduitId:string) {
        let new_api_host = this.routerParam(this.api_host,tytpeProduitId);
        return this.httpClient.get<TypeProduitDto[]>(new_api_host,this.httpOptions);
    }
getOne(id:string)
{
  let new_api_host = this.routerParam(this.api_host+'/getByreference',id);
  return this.httpClient.get<ProduitDto>(new_api_host,this.httpOptions);
}

routerParam(host:string, param: string){
  return host + "/" + param;
}
}
