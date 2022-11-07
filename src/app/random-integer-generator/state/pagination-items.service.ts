import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { PaginationItem } from './pagination-item.model';
import { PaginationItemsStore } from './pagination-items.store';

@Injectable({ providedIn: 'root' })
export class PaginationItemsService {

  constructor(private paginationItemsStore: PaginationItemsStore, private http: HttpClient) {
  }


  get() {
    return this.http.get<PaginationItem[]>('https://api.com').pipe(tap(entities => {
      this.paginationItemsStore.set(entities);
    }));
  }

  add(paginationItem: PaginationItem) {
    this.paginationItemsStore.add(paginationItem);
  }

  update(id, paginationItem: Partial<PaginationItem>) {
    this.paginationItemsStore.update(id, paginationItem);
  }

  remove(id: ID) {
    this.paginationItemsStore.remove(id);
  }

}
