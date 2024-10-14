import { environment } from 'src/environments/environment';
import type { CreateUpdateColisDto, ColisDto, ColisCreateUpdateProduitDto, ColisSearchDto } from './models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColisService {
  getProduits() {
    return this.httpClient.get<any>('assets/demo/data/produit.json')
      .toPromise()
      .then(res => res.data as any[])
      .then(data => data);
  }
  getBureaux() {
    return this.httpClient.get<any>('assets/demo/data/bureau.json')
      .toPromise()
      .then(res => res.data as any[])
      .then(data => data);
  }

  apiName = 'colis';
  private api_host: string = environment.api_host + this.apiName;
  myToken = sessionStorage.getItem("token");
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + this.myToken
    })
  }
  constructor(private readonly httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get<[ColisDto]>(this.api_host, this.httpOptions);
  }


  findColisByStructure(id: string) {
    let new_api_host = this.routerParam(this.api_host + '/findColisByStructure', id);
    return this.httpClient.get<[ColisDto]>(new_api_host, this.httpOptions);
  }

  findColisByDestination(id: string) {
    let new_api_host = this.routerParam(this.api_host + '/findColisByDestination', id);
    return this.httpClient.get<[ColisDto]>(new_api_host, this.httpOptions);
  }

  saveProduit(item: ColisCreateUpdateProduitDto) {
    return this.httpClient.post(this.api_host, item, this.httpOptions);
  }
  savePoids(item: ColisDto) {
    return this.httpClient.post(this.api_host + '/poids', item, this.httpOptions);
  }
  delete(id: string) {
    let new_api_host = this.routerParam(this.api_host, id);
    return this.httpClient.delete(new_api_host, this.httpOptions);
  }

  update(id: string, item: ColisDto) {
    let new_api_host = this.routerParam(this.api_host, id);
    return this.httpClient.put<ColisDto>(new_api_host, item, this.httpOptions);
  }
  
  livrer(id: string, selectedColis: ColisDto): Observable<ColisDto> {
    const url = `${this.api_host}/livrerColis/${id}`;
    return this.httpClient.put<ColisDto>(url, this.httpOptions);
  }


findByCode(code:string)
{
  let new_api_host = this.routerParam(this.api_host+'/findByCode',code);
  return this.httpClient.get<ColisDto>(new_api_host,this.httpOptions);
}

  getOneById(id: string) {
    let new_api_host = this.routerParam(this.api_host, id);
    return this.httpClient.get<ColisDto>(new_api_host, this.httpOptions);
  }

  getOne(id: string) {
    let new_api_host = this.routerParam(this.api_host + '/getByreference', id);
    return this.httpClient.get<ColisDto>(new_api_host, this.httpOptions);
  }


  findColisByAgent(search: ColisSearchDto) {
    let new_api_host = this.routerParam(this.api_host, 'searchByAgent');
    return this.httpClient.post<ColisDto[]>(new_api_host, search, this.httpOptions);
  }

  findColisByCriteres(search: ColisSearchDto) {
    let new_api_host = this.routerParam(this.api_host, 'searchByCriteria');
    return this.httpClient.post<ColisDto[]>(new_api_host, search, this.httpOptions);
  }

  findColisByStatus(id: string, idStructure: string) {
    let new_api_host = this.routerParam(this.api_host, 'findColisByStatus',id,idStructure);
    return this.httpClient.get<ColisDto[]>(new_api_host, this.httpOptions);
  }
  routerParam(baseUrl, ...params) {
    return `${baseUrl}/${params.join('/')}`;
}
}
