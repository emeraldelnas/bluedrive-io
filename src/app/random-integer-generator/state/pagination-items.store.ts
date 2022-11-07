import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { PaginationItem } from './pagination-item.model';

export interface PaginationItemsState extends EntityState<PaginationItem> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'PaginationItems' })
export class PaginationItemsStore extends EntityStore<PaginationItemsState> {

  constructor() {
    super();
  }

}
