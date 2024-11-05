import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CategorieDto} from "../categorie";
import {Paysdto} from "./models";

@Injectable({
    providedIn: 'root',
})

export  class PaysService{
    private api_host = `${environment.api_host}categorieCourrier`;
    myToken = sessionStorage.getItem("token");
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            "Authorization" : "Bearer "+this.myToken
        })
    }

    constructor(private readonly httpClient : HttpClient) { }

    findAll() {
        return this.httpClient.get<Paysdto[]>(environment.api_host+'pays', this.httpOptions);
    }



}
