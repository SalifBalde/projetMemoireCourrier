import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Paysdto} from "./models";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import type {ZoneDto} from "../zones";

@Injectable({
    providedIn: 'root',
})

export  class PaysService{
    private api_host = `${environment.api_host}pays`;
    myToken = sessionStorage.getItem("token");
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            "Authorization" : "Bearer "+this.myToken
        })
    }

    constructor(private readonly httpClient : HttpClient) { }



    findAll(): Observable<Paysdto[]> {
        return this.httpClient.get<Paysdto[]>(environment.api_host+'pays', this.httpOptions);
    }

    save(item: Paysdto)
    {
        return this.httpClient.post(this.api_host,item,this.httpOptions);
    }

    getOneById(id:string) {
        let new_api_host = this.routerParam(this.api_host,id);
        return this.httpClient.get<Paysdto>(new_api_host,this.httpOptions);
    }

    update(id:string, item:Paysdto)
    {
        let new_api_host = this.routerParam(this.api_host,id);
        return this.httpClient.put<Paysdto>(new_api_host,item,this.httpOptions);
    }
    delete(id:string)
    {
        let new_api_host = this.routerParam(this.api_host,id);
        return this.httpClient.delete(new_api_host,this.httpOptions);
    }

    routerParam(host:string, param: string){
        return host + "/" + param;
    }
}
