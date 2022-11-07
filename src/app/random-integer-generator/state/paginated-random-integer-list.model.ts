import { ID } from '@datorama/akita';
import { RandomInteger } from '@models/random-integer';

export interface PaginatedRandomIntegerList {
  id: ID;
  count: number;
  next: string;
  previous: string;
  results: RandomInteger[];
}

export function createPaginatedRandomIntegerList(
  params: Partial<PaginatedRandomIntegerList>
) {
  return {
    id: params.id,
    count: params.count,
    next: params.next,
    previous: params.previous,
    results: params.results,
  } as PaginatedRandomIntegerList;
}
