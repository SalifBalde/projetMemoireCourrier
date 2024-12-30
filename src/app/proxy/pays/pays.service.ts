import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Paysdto} from "./models";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root',
})

export  class PaysService{
    private api_host = `${environment.api_host}client`;
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
}
