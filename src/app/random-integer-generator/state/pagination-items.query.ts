import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { PaginationItemsStore, PaginationItemsState } from './pagination-items.store';

@Injectable({ providedIn: 'root' })
export class PaginationItemsQuery extends QueryEntity<PaginationItemsState> {

  constructor(protected store: PaginationItemsStore) {
    super(store);
  }

}
