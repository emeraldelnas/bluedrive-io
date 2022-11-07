import { RandomInteger } from './random-integer';

export interface PaginatedRandomIntegerList {
  count: number;
  next: string;
  previous: string;
  results: RandomInteger[];
}
