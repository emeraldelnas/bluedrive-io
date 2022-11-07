import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import {
  IntegersChartDataStore,
  IntegersChartDataState,
} from './integers-chart-data.store';

@Injectable({ providedIn: 'root' })
export class IntegersChartDataQuery extends QueryEntity<IntegersChartDataState> {
  constructor(protected override store: IntegersChartDataStore) {
    super(store);
  }
}
