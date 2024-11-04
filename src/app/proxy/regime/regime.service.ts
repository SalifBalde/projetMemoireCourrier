import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Regimedto} from "./models";

@Injectable({
  providedIn: 'root'
})
export class RegimeService {
    apiName = 'regime';
    private api_host: string = environment.api_host + this.apiName;
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    }

    constructor(private readonly httpClient: HttpClient) {
    }

    findAll() {
        return this.httpClient.get<[Regimedto]>(this.api_host, this.httpOptions);
    }
}
