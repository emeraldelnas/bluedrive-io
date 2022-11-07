import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import {
  PaginatedRandomIntegerListStore,
  PaginatedRandomIntegerListState,
} from './paginated-random-integer-list.store';

@Injectable({ providedIn: 'root' })
export class PaginatedRandomIntegerListQuery extends QueryEntity<PaginatedRandomIntegerListState> {
  allState$ = this.select();

  constructor(protected override store: PaginatedRandomIntegerListStore) {
    super(store);
  }
}
