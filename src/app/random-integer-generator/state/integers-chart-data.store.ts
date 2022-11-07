import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { IntegersChartDatum } from './integers-chart-datum.model';

export interface IntegersChartDataState extends EntityState<IntegersChartDatum> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'IntegersChartData' })
export class IntegersChartDataStore extends EntityStore<IntegersChartDataState> {

  constructor() {
    super();
  }

}
