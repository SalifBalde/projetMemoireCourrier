import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Conditiondto} from "./models";

@Injectable({
    providedIn: 'root',
})

export  class ConditionService {
    private api_host = `${environment.api_host}condition`;
    myToken = sessionStorage.getItem("token");
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + this.myToken
        })
    }

    constructor(private readonly httpClient: HttpClient) {
    }


    findAll(): Observable<Conditiondto[]> {
        return this.httpClient.get<Conditiondto[]>(this.api_host, this.httpOptions);
    }

}
