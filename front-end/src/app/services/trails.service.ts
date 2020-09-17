import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TrailsService {
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/rutas';
  }

  getAllTrails(): Promise<any[]> {
    const specificUrl = this.baseUrl + '/listado';

    return this.httpClient.get<any[]>(specificUrl).toPromise();
  }

  getAllTags(): Promise<any[]> {
    const specificUrl = this.baseUrl + '/listado/etiquetas';

    return this.httpClient.get<any[]>(specificUrl).toPromise();
  }

  getAllCathegories(): Promise<any[]> {
    const specificUrl = this.baseUrl + '/listado/categorias';

    return this.httpClient.get<any[]>(specificUrl).toPromise();
  }

  getTrailByCathegory(pCathegory): Promise<any[]> {
    const specificUrl = this.baseUrl + '/listado/categorias/' + pCathegory;

    return this.httpClient.get<any[]>(specificUrl).toPromise();
  }

  getTrailByTag(pTag): Promise<any[]> {
    const specificUrl = this.baseUrl + '/listado/etiquetas/' + pTag;

    return this.httpClient.get<any[]>(specificUrl).toPromise();
  }

  getTrailById(pId): Promise<any> {
    const specificUrl = this.baseUrl + '/listado/ruta/' + pId;

    return this.httpClient.get<any>(specificUrl).toPromise();
  }

  registerTrail(pTrail): Promise<any> {
    const specificUrl = this.baseUrl + '/formulario';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
        'x-access-token': localStorage.getItem('token'),
        'x-role': localStorage.getItem('role'),
      }),
    };
    return this.httpClient.post(specificUrl, pTrail, httpOptions).toPromise();
  }

  updateTrail(pId, pTrail): Promise<any> {
    const specificUrl = this.baseUrl + '/formulario/' + pId;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
        'x-access-token': localStorage.getItem('token'),
        'x-role': localStorage.getItem('role'),
      }),
    };
    return this.httpClient.put(specificUrl, pTrail, httpOptions).toPromise();
  }

  deleteTrail(pId): Promise<any> {
    const specificUrl = this.baseUrl + '/formulario/' + pId;

    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
        'x-role': localStorage.getItem('role'),
      }),
    };

    return this.httpClient.delete(this.baseUrl).toPromise();
  }

  addCathegory(pTrail, pCathegory): Promise<any> {
    const specificUrl =
      this.baseUrl + '/categorizar/' + pTrail + '/' + pCathegory;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
        'x-access-token': localStorage.getItem('token'),
        role: localStorage.getItem('role'),
      }),
    };
    return this.httpClient.post(specificUrl, httpOptions).toPromise();
  }

  addTag(pTrail, pTag): Promise<any> {
    const specificUrl = this.baseUrl + '/etiquetar/' + pTrail + '/' + pTag;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
      }),
    };
    return this.httpClient.post(specificUrl, httpOptions).toPromise();
  }

  addComment(pTrial, pUser, pComment): Promise<any> {
    const specificUrl = this.baseUrl + '/comentar/' + pTrial + '/' + pUser;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
      }),
    };
    return this.httpClient.post(specificUrl, pComment, httpOptions).toPromise();
  }
}
