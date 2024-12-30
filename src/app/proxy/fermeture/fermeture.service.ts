import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Fermeturedto} from "./models";

@Injectable({
    providedIn: 'root',
})

export  class FermetureService {
    private api_host = `${environment.api_host}client`;
    myToken = sessionStorage.getItem("token");
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            "Authorization" : "Bearer "+this.myToken
        })
    }

    constructor(private readonly httpClient : HttpClient) { }



    findAll(): Observable<Fermeturedto[]> {
        return this.httpClient.get<Fermeturedto[]>(environment.api_host+'pays', this.httpOptions);
    }

    saveFermeture(fermeture : Fermeturedto): Observable<any> {
        return this.httpClient.post<any>(environment.api_host+'fermeture',fermeture, this.httpOptions);
    }
}
