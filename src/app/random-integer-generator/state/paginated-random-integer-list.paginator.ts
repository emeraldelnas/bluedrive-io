import { inject, InjectionToken } from '@angular/core';
import { PaginatorPlugin } from '@datorama/akita';
import { PaginatedRandomIntegerListQuery } from './paginated-random-integer-list.query';

export const RANDOM_INTEGER_PAGINATOR = new InjectionToken(
  'RANDOM_INTEGER_PAGINATOR',
  {
    providedIn: 'root',
    factory: () => {
      const randomIntegerListQuery = inject(PaginatedRandomIntegerListQuery);
      return new PaginatorPlugin(randomIntegerListQuery)
        .withControls()
        .withRange();
    },
  }
);
