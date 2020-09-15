import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable, throwError } from 'rxjs';
//import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TrailsService {
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/rutas';
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

  getAllTrails(): Promise<any[]> {
    const specificUrl = this.baseUrl + '/listado';

    return this.httpClient.get<any[]>(specificUrl).toPromise();
    /*.pipe(
      retry(2),
      catchError(this.handleError)
    ); */
  }

  getAllTags(): Promise<any[]> {
    const specificUrl = this.baseUrl + '/listado/categorías';

    return this.httpClient.get<any[]>(specificUrl).toPromise();
  }

  getAllCathegories(): Promise<any[]> {
    const specificUrl = this.baseUrl + '/listado/etiquetas';

    return this.httpClient.get<any[]>(specificUrl).toPromise();
  }

  getTrailByCathegory(pCathegory): Promise<any[]> {
    const specificUrl = this.baseUrl + '/listado/categorias' + pCathegory;

    return this.httpClient.get<any[]>(specificUrl).toPromise();
  }

  getTrailByTag(pTag): Promise<any[]> {
    const specificUrl = this.baseUrl + '/listado/etiquetas' + pTag;

    return this.httpClient.get<any[]>(specificUrl).toPromise();
  }

  getTrailById(pId): Promise<any> {
    const specificUrl = this.baseUrl + '/listado/ruta' + pId;

    return this.httpClient.get<any>(specificUrl).toPromise();
  }

  registerTrail(pTrail): Promise<any> {
    const specificUrl = this.baseUrl + '/formulario';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
      }),
    };
    return this.httpClient.post(specificUrl, pTrail, httpOptions).toPromise();
  }

  updateTrail(pId, pTrail): Promise<any> {
    const specificUrl = this.baseUrl + '/formulario' + pId;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
      }),
    };
    return this.httpClient.put(specificUrl, pTrail, httpOptions).toPromise();
  }

  deleteTrail(pId): Promise<any> {
    const specificUrl = this.baseUrl + '/formulario' + pId;

    return this.httpClient.delete(this.baseUrl).toPromise();
  }

  addCathegory(pTrail, pCathegory): Promise<any> {
    const specificUrl = this.baseUrl + '/categorizar' + pTrail + pCathegory;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
      }),
    };
    return this.httpClient.post(specificUrl, httpOptions).toPromise();
  }

  addTag(pTrail, pTag): Promise<any> {
    const specificUrl = this.baseUrl + '/etiquetar' + pTrail + pTag;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
      }),
    };
    return this.httpClient.post(specificUrl, httpOptions).toPromise();
  }

  addComment(pTrial, pUser, pComment): Promise<any> {
    const specificUrl = this.baseUrl + '/comentar' + pTrial + pUser;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
      }),
    };
    return this.httpClient.post(specificUrl, pComment, httpOptions).toPromise();
  }
}
