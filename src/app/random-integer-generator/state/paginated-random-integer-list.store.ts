import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { PaginatedRandomIntegerList } from './paginated-random-integer-list.model';

export interface PaginatedRandomIntegerListState
  extends EntityState<PaginatedRandomIntegerList> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'PaginatedRandomIntegerList',
  cache: {
    ttl: 3600000,
  },
})
export class PaginatedRandomIntegerListStore extends EntityStore<PaginatedRandomIntegerListState> {
  constructor() {
    super();
  }
}
