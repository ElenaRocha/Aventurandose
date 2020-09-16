import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable, throwError } from 'rxjs';
//import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/usuarios';
  }

  /*private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // Return an observable with a user-facing error message.
  return throwError(
    'Something bad happened; please try again later.');
} */

  getWeather(lat, lon): Promise<any> {
    const specificUrl = this.baseUrl + '/el-tiempo/' + lat + '/' + lon;

    return this.httpClient.get<any>(specificUrl).toPromise();
  }

  createUser(pUser): Promise<any> {
    const specificUrl = this.baseUrl + '/darse-de-alta';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
      }),
    };
    return this.httpClient.post(specificUrl, pUser, httpOptions).toPromise();
  }

  getUserById(pId): Promise<any> {
    const specificUrl = this.baseUrl + '/ver-perfil/' + pId;

    return this.httpClient.get<any>(specificUrl).toPromise();
  }

  updateUser(pId, pUser): Promise<any> {
    const specificUrl = this.baseUrl + 'ver-perfil/' + pId;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
      }),
    };
    return this.httpClient.put(specificUrl, pUser, httpOptions).toPromise();
  }

  unsuscribe(pId): Promise<any> {
    const specificUrl = this.baseUrl + '/ver-perfil/' + pId;

    return this.httpClient.delete(this.baseUrl).toPromise();
  }

  userLogin(pUser): Promise<any> {
    const specificUrl = this.baseUrl + '/entrar';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
      }),
    };
    return this.httpClient.post(specificUrl, pUser, httpOptions).toPromise();
  }
}
