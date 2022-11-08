import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '@environments/environment';
import { RandomInteger } from '@models/random-integer';
import { ListParams } from '@models/list-params';
import { PaginatedRandomIntegerList } from '@models/paginated-random-integer-list';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public fetchRandomIntegerList(
    paramsObj: ListParams
  ): Observable<PaginatedRandomIntegerList> {
    const url = `${env.API_BASE_URL}/randominteger/`;
    return this.http.get<PaginatedRandomIntegerList>(url, {
      params: this.getParams(paramsObj),
    });
  }

  public fetchGeneratedRandomInteger(): Observable<RandomInteger> {
    const url = `${env.API_BASE_URL}/randominteger/generate/`;
    return this.http.get<RandomInteger>(url);
  }

  // Converts an object into params
  private getParams(p: object = {}): HttpParams {
    let params = new HttpParams();

    Object.entries(p).forEach((param) => {
      const [key, value] = param;
      if (value || value !== '') {
        params = params.append(key, value);
      }
    });

    return params;
  }
}
