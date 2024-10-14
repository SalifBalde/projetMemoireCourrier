import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import type { VersementDto } from './models'; 

@Injectable({
  providedIn: 'root',
})
export class VersementService {
  apiName = 'versement'; 
  private api_host: string = environment.api_host + this.apiName; 
  myToken = sessionStorage.getItem("token");
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": "Bearer" + this.myToken,
    })
  };

  constructor(private readonly httpClient: HttpClient) { }

 
  verser(item: VersementDto): Observable<VersementDto> {
    return this.httpClient.post<VersementDto>(this.api_host, item, this.httpOptions);
  }

  findAll(): Observable<VersementDto[]> {
    return this.httpClient.get<VersementDto[]>(this.api_host, this.httpOptions);
  }


  getOneById(id: string): Observable<VersementDto> {
    const url = this.routerParam(this.api_host, id);
    return this.httpClient.get<VersementDto>(url, this.httpOptions);
  }


  update(id: string, item: VersementDto): Observable<VersementDto> {
    const url = this.routerParam(this.api_host, id);
    return this.httpClient.put<VersementDto>(url, item, this.httpOptions);
  }

 
  delete(id: string): Observable<void> {
    const url = this.routerParam(this.api_host, id);
    return this.httpClient.delete<void>(url, this.httpOptions);
  }


  private routerParam(host: string, param: string): string {
    return `${host}/${param}`;
  }
}

