import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Acheminementdto} from "./models";

@Injectable({
    providedIn: 'root',
})

export  class AcheminementService {
    private api_host = `${environment.api_host}acheminements`;
    myToken = sessionStorage.getItem("token");
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            "Authorization" : "Bearer "+this.myToken
        })
    }

    constructor(private readonly httpClient : HttpClient) { }



    findAll(): Observable<Acheminementdto[]> {
        return this.httpClient.get<Acheminementdto[]>(this.api_host, this.httpOptions);
    }

    saveache(noeux : Acheminementdto): Observable<any> {
        return this.httpClient.post<any>(this.api_host,noeux, this.httpOptions);
    }
    findById(idnoeud : number): Observable<Acheminementdto[]> {
        return this.httpClient.get<Acheminementdto[]>(this.api_host+'/noeud/'+idnoeud, this.httpOptions);
    }
}
