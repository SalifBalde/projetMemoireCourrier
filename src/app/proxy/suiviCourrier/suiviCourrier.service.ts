import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SuiviCourrierdto } from './models';

@Injectable({
  providedIn: 'root',
})
export class SuiviCourrierService {
  apiName = 'suiviCourrier';
  private api_host: string = environment.api_host + this.apiName;
  myToken = sessionStorage.getItem("token");
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization" : "Bearer "+this.myToken
    })
  };

  constructor(private readonly httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get<SuiviCourrierdto[]>(this.api_host, this.httpOptions);
  }

  getOne(id: string | number) {
    const new_api_host = this.routerParam(this.api_host, id);
    return this.httpClient.get<SuiviCourrierdto>(new_api_host, this.httpOptions);
  }

  create(SuiviCourrierdto: SuiviCourrierdto) {
    return this.httpClient.post<SuiviCourrierdto>(this.api_host, SuiviCourrierdto, this.httpOptions);
  }

  update(id: string | number, SuiviCourrierdto: SuiviCourrierdto) {
    const new_api_host = this.routerParam(this.api_host, id);
    return this.httpClient.put<SuiviCourrierdto>(new_api_host, SuiviCourrierdto, this.httpOptions);
  }

  delete(id: string | number) {
    const new_api_host = this.routerParam(this.api_host, id);
    return this.httpClient.delete(new_api_host, this.httpOptions);
  }

  getByCodeBarre(codeBarre: string) {
    return this.httpClient.get<SuiviCourrierdto[]>(`${this.api_host}/codeBarre/${codeBarre}`, this.httpOptions);
  }

  routerParam(baseUrl: string, ...params: (string | number)[]) {
    return `${baseUrl}/${params.join('/')}`;
  }
}
