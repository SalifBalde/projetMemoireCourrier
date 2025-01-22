import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StockDto } from './models';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  apiName = 'stock';
  private api_host: string= environment.api_stock + this.apiName;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    //  "Authorization" : "Bearer "+this.myToken
    })
  }
  constructor(private readonly httpClient : HttpClient) { }

  getStocksByCaisseIdAndTypeProduit(caisseId: string, typeProduitId: string)
{
    let new_api_host = this.routerParam(this.api_host + '/getStocksByCaisseIdAndTypeProduit', caisseId, typeProduitId);
  return this.httpClient.get<[StockDto]>(new_api_host,this.httpOptions);
}

getStocksByCaisseFigurine(caisseId: string)
{
    let new_api_host = this.routerParam(this.api_host ,'find-by-caisse-figurine', caisseId);
  return this.httpClient.get<[StockDto]>(new_api_host,this.httpOptions);
}


getOneById(id:string)
{
  let new_api_host = this.routerParam(this.api_host,id);
  return this.httpClient.get<StockDto>(new_api_host,this.httpOptions);
}

getOne(id:string)
{
  let new_api_host = this.routerParam(this.api_host+'/getByreference',id);
  return this.httpClient.get<StockDto>(new_api_host,this.httpOptions);
}

getTaxeByZoneAndService(zoneId: string, serviceId: string) {
    let new_api_host = this.routerParam(this.api_host + '/getTaxe', zoneId, serviceId);
    return this.httpClient.get<number>(new_api_host, this.httpOptions);
  }

  private routerParam(baseUrl: string, ...params: string[]) {
    return `${baseUrl}/${params.join('/')}`;
  }
}
