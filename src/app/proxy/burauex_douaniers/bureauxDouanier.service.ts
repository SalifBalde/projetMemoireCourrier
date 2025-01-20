import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {BureauxDouanierdto} from "./models";

@Injectable({
    providedIn: 'root',
})

export  class BureauxDouanierService {
    private api_host = `${environment.api_host}client`;
    myToken = sessionStorage.getItem("token");
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            "Authorization" : "Bearer "+this.myToken
        })
    }

    constructor(private readonly httpClient : HttpClient) { }



    findAll(): Observable<BureauxDouanierdto[]> {
        return this.httpClient.get<BureauxDouanierdto[]>(environment.api_host+'BureauxDouanier', this.httpOptions);
    }
    isStructureDouaniere(structureId: number): Observable<boolean> {
        return this.httpClient.get<boolean>(environment.api_host+'BureauxDouanier/'+structureId+'/isDouanier', this.httpOptions)
    }
}
