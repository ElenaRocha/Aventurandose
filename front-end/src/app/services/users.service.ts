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

  getWeather(): Promise<any[]> {
    const specifictUrl = this.baseUrl + '/el-tiempo'; //.../:lat/:lon
  } //??

  createUser(pUser): Promise<any> {
    const specificUrl = this.baseUrl + '/darse-de-alta';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
      }),
    };
    return this.httpClient.post(specificUrl, pUser, httpOptions).toPromise();
  }

  updateUser(pId, pUser): Promise<any> {
    const specificUrl = this.baseUrl + 'modificar-perfil' + pId;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
      }),
    };
    return this.httpClient.put(specificUrl, pUser, httpOptions).toPromise();
  }

  unsuscribe(pId): Promise<any> {
    const specificUrl = this.baseUrl + '/darse-de-baja' + pId;

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
  } //traerse el token?
}
