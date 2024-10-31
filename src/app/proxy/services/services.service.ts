import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {ServicesDto} from "./models";


@Injectable({
    providedIn: 'root',
})
export class ServicesService {
    private api_host = `${environment.api_host}service`;
    myToken = sessionStorage.getItem("token");
    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "Authorization" : "Bearer "+this.myToken
      })
    }
    constructor(private readonly httpClient : HttpClient) { }


    getAllService(): Observable<ServicesDto[]> {
        return this.httpClient.get<ServicesDto[]>(environment.api_host+'serviceCourrier')
    }





    save(item: ServicesDto)
    {

        return this.httpClient.post(this.api_host,item,this.httpOptions);
    }


    update(id:string, item:ServicesDto)
    {
      let new_api_host = this.routerParam(this.api_host,id);
      return this.httpClient.put<ServicesDto>(new_api_host,item,this.httpOptions);
    }

    getBureaux() {
        return this.httpClient.get<any>('assets/demo/data/bureau.json')
            .toPromise()
            .then(res => res.data as any[])
            .then(data => data);
    }
    getProduits() {
        return this.httpClient.get<any>('assets/demo/data/produit.json')
            .toPromise()
            .then(res => res.data as any[])
            .then(data => data);
    }


routerParam(host:string, param: string){
    return host + "/" + param;
  }




}
