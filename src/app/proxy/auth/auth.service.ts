import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { TokenService } from './token.service';

const TOKEN_KEY = 'token';
const REFRESHTOKEN_KEY = 'refresh_token';
const AUTH_API = 'http://10.10.3.138:8080/realms/digitalpost/protocol/openid-connect/token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    redirectUrl = '';

  constructor(private router: Router, private http: HttpClient, private tokenService: TokenService) {}

  private static handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  private static log(message: string): any {
    console.log(message);
  }

  public login(user:string,password:string):Observable<any> {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const headers = new HttpHeaders().set(
      'Content-Type',
     'application/x-www-form-urlencoded;'
    );

    const body = new HttpParams()
    .set('grant_type', 'password')
    .set('username', user)
    .set('password', password)
    .set('client_id', 'digital-front-client');

   // return this.http.post(AUTH_API, body , {headers: headers })
   return this.http.post<any>(AUTH_API, body , {headers: headers })
   .pipe(
     tap(res => {
       this.tokenService.saveToken(res.access_token);
       this.tokenService.saveRefreshToken(res.refresh_token);
     }),
     catchError(AuthService.handleError)
   );

  }

  public refreshToken(refresh_token:any):Observable<any> {
    this.tokenService.removeToken();
   // this.tokenService.removeRefreshToken();
    const headers = new HttpHeaders().set(
      'Content-Type',
     'application/x-www-form-urlencoded;'
    );

    const body = new HttpParams()
    .set('grant_type', 'password')
    .set('username', 'diokou1')
    .set('password', '1234')
    .set('client_id', 'digital-front-client');

   // return this.http.post(AUTH_API, body , {headers: headers })

    return this.http.post<any>(AUTH_API, body , {headers: headers })
      .pipe(
        tap(res => {
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }),
        catchError(AuthService.handleError)
      );

  }

  public logout()  {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
   // localStorage.clear();
   // location.reload()
  }

  secured(): Observable<any> {
    return this.http.get<any>(AUTH_API + 'secret')
      .pipe(catchError(AuthService.handleError));
  }

  public getIsLogged(): boolean {
    return (window.sessionStorage.getItem(TOKEN_KEY)!=null);
  }

  public getUsername() {
    if(this.getIsLogged()){
      const token = window.sessionStorage.getItem(TOKEN_KEY);
      const payload = token!.split('.')[1];
      const payloadDecodedJson = atob(payload);
      const payloadDecoded = JSON.parse(payloadDecodedJson);
      return payloadDecoded.preferred_username ;
    }

  }

  public getIsAdmin() {
    const token =  window.sessionStorage.getItem(TOKEN_KEY);
    const payload = token!.split('.')[1];
    const payloadDecodedJson = atob(payload);
    const payloadDecoded = JSON.parse(payloadDecodedJson);
    // console.log(payloadDecoded.realm_access.roles);
    return payloadDecoded.realm_access.roles.indexOf('admin') !== -1;
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getUser(): string | null {
    const jwtToken = this.getToken();
    const decodedToken: any =
      this.getToken() != null ? jwtDecode(jwtToken as string) : null;
    const userId = decodedToken != null ? decodedToken?.sub : null;
    return userId;
  }
  public getUserId(): string | null {
    const jwtToken = this.getToken();
    const decodedToken: any =
      this.getToken() != null ? jwtDecode(jwtToken as string) : null;
    const userId = decodedToken != null ? decodedToken?.id : null;
    return userId;
  }
  public getToken(): string | null {
    return  window.sessionStorage.getItem(TOKEN_KEY) !== null
      ? window.sessionStorage.getItem(TOKEN_KEY)
      : null;
  }

  public saveRefreshToken(token: string): void {
    //window.sessionStorage.removeItem(REFRESHTOKEN_KEY);
    window.sessionStorage.setItem(REFRESHTOKEN_KEY, token);
  }


  public getRole() {
    const jwtToken = this.getToken();
    const decodedToken: any =
      this.getToken() != null ? jwtDecode(jwtToken as string) : null;
    const userRole = decodedToken != null ? decodedToken?.Role : null;
    return userRole;
  }

  signOut(): void {
    window.sessionStorage.clear();
    this.router.navigate(['/Home']).then(() => {
      window.location.reload();
    });
  }
}
