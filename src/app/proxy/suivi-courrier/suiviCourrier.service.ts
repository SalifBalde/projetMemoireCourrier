import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {TypeCategorieDto} from "../type-categorie";
import {RegimeDto} from "../regime";
import {SuiviCourrierDto} from "./models";

@Injectable({
    providedIn: 'root',
})
export class SuiviCourrierService {
    apiName = 'suiviCourrier';
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
        return this.httpClient.get<[SuiviCourrierDto]>(this.api_host,this.httpOptions);
    }

    save(item: SuiviCourrierDto)
    {
        return this.httpClient.post(this.api_host,item,this.httpOptions);
    }

    delete(id:string)
    {

        return this.httpClient.delete(this.api_host,this.httpOptions);
    }


    update(id:string, item:SuiviCourrierDto)
    {
         return this.httpClient.put<SuiviCourrierDto>(this.api_host,item,this.httpOptions);
    }


}
