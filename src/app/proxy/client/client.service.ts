import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ClientDto } from './models';

@Injectable({
    providedIn: 'root',
})
export class ClientService {
    private api_host = `${environment.api_host}client`;
    myToken = sessionStorage.getItem("token");
    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "Authorization" : "Bearer "+this.myToken
      })
    }
    constructor(private readonly httpClient : HttpClient) { }


    searchClient(keyword: string): Observable<ClientDto> {
        return this.httpClient.get<ClientDto>(`${environment.api_host}client/recherche?${keyword}`)
    }

    getClientByTelephoneOrCni(telephone?: string, cni?: string): Observable<ClientDto> {
        let params = new HttpParams();
        // Ajouter les paramètres à la requête si présents
        if (telephone) {
            params = params.set('telephone', telephone);
        }
        if (cni) {
            params = params.set('cni', cni);
        }

        return this.httpClient.get<ClientDto>(`${environment.api_host}client/recherche`, { params });
    }



    save(client: ClientDto)
    {
      return this.httpClient.post(`${environment.api_host}client`, client, this.httpOptions);
    }


    update(id:string, item:ClientDto)
    {
      let new_api_host = this.routerParam(this.api_host,id);
      return this.httpClient.put<ClientDto>(new_api_host,item,this.httpOptions);
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
    //fonctionnalitée pour chercher les info du destinataire

    searchDestinataire(cni: string, telephone: string): Observable<any> {

        return this.httpClient.get(`${environment.api_host}client`);
    }

    // Fonction pour créer un nouveau destinataire s'il n'existe pas
    createDestinataire(client: any): Observable<any> {
        return this.httpClient.post(environment.api_host, client);
    }
}

export class ClientStorageService {
    private clientDetails: ClientDto;
    private httpClient: HttpClient;

    constructor() { }
    setClientDetails(clientDetails: ClientDto): void {
        this.clientDetails = clientDetails;
    }

    getClientDetails(): ClientDto {
        return this.clientDetails;
    }



}
