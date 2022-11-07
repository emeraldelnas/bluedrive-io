import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { IntegersChartDatum } from './integers-chart-datum.model';
import { IntegersChartDataStore } from './integers-chart-data.store';

@Injectable({ providedIn: 'root' })
export class IntegersChartDataService {
  constructor(
    private integersChartDataStore: IntegersChartDataStore,
    private http: HttpClient
  ) {}

  get() {
    return this.http.get<IntegersChartDatum[]>('https://api.com').pipe(
      tap((entities) => {
        this.integersChartDataStore.set(entities);
      })
    );
  }

  add(integersChartDatum: IntegersChartDatum) {
    this.integersChartDataStore.add(integersChartDatum);
  }

  // update(id, integersChartDatum: Partial<IntegersChartDatum>) {
  //   this.integersChartDataStore.update(id, integersChartDatum);
  // }

  remove(id: ID) {
    this.integersChartDataStore.remove(id);
  }
}
