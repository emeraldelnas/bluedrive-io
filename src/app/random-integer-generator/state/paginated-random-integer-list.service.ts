import { PaginatedRandomIntegerListQuery } from './paginated-random-integer-list.query';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { map, switchMap, tap } from 'rxjs/operators';
import { PaginatedRandomIntegerList } from './paginated-random-integer-list.model';
import { PaginatedRandomIntegerListStore } from './paginated-random-integer-list.store';

import { environment as env } from '@environments/environment';
import { EMPTY, ObservableInput, of } from 'rxjs';

interface ListParams {
  limit: number;
  offset: number;
}

@Injectable({ providedIn: 'root' })
export class PaginatedRandomIntegerListService {
  constructor(
    private http: HttpClient,
    private paginatedRandomIntegerListStore: PaginatedRandomIntegerListStore,
    private paginatedListQuery: PaginatedRandomIntegerListQuery
  ) {}

  get(paramsObj: ListParams) {
    const url = `${env.API_BASE_URL}/randominteger/`;

    // return this.http
    //   .get<PaginatedRandomIntegerList>(url, {
    //     params: this.getParams(paramsObj),
    //   })
    //   .pipe(
    //     tap((entities) => {
    //       this.paginatedRandomIntegerListStore.add({
    //         ...entities,
    //         id: paramsObj.offset,
    //       });
    //     })
    //   );

    // return of(this.paginatedListQuery.hasEntity(1)).pipe(
    //   switchMap((res) => {
    //     return of(true);
    //   })
    // )

    return this.paginatedListQuery
      .selectEntity<PaginatedRandomIntegerList>(1)
      .pipe(
        switchMap((item) => {
          console.log(item);
          const apiCall = this.http
            .get<PaginatedRandomIntegerList>(url, {
              params: this.getParams(paramsObj),
            })
            .pipe(
              tap((entities) => {
                this.paginatedRandomIntegerListStore.add({
                  ...entities,
                  id: paramsObj.offset,
                });
              })
            );

          return !!item ? of(item) : apiCall;
        })
      );

    // return this.paginatedListQuery.selectHasCache().pipe(
    //   switchMap((hasCache) => {
    //     const apiCall = this.http
    //       .get<PaginatedRandomIntegerList>(url, {
    //         params: this.getParams(paramsObj),
    //       })
    //       .pipe(
    //         tap((entities) => {
    //           this.paginatedRandomIntegerListStore.add({
    //             ...entities,
    //             id: paramsObj.offset,
    //           });
    //         })
    //       );
    //       console.log(hasCache);

    //     return hasCache ? EMPTY : apiCall;
    //   })
    // );
  }

  add(paginatedRandomIntegerList: PaginatedRandomIntegerList) {
    this.paginatedRandomIntegerListStore.add(paginatedRandomIntegerList);
  }

  // update(id, paginatedRandomIntegerList: Partial<PaginatedRandomIntegerList>) {
  //   this.paginatedRandomIntegerListStore.update(id, paginatedRandomIntegerList);
  // }

  remove(id: ID) {
    this.paginatedRandomIntegerListStore.remove(id);
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
