import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/usuarios';
  }

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
        'x-access-token': localStorage.getItem('token'),
        'x-role': localStorage.getItem('role'),
      }),
    };

    return this.httpClient.put(specificUrl, pUser, httpOptions).toPromise();
  }

  unsuscribe(pId): Promise<any> {
    const specificUrl = this.baseUrl + '/ver-perfil/' + pId;

    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
        'x-role': localStorage.getItem('role'),
      }),
    };

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
