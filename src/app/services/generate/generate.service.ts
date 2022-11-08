import { ListParams } from './../../shared/models/list-params';
import { Injectable } from '@angular/core';
import { ApiService } from '@api/api.service';
import { PaginatedRandomIntegerList } from '@models/paginated-random-integer-list';
import { RandomInteger } from '@models/random-integer';
import { ChartData, ChartDataset } from 'chart.js';
import { BehaviorSubject, map, Observable } from 'rxjs';

import * as dayjs from 'dayjs';
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

@Injectable({
  providedIn: 'root',
})
export class GenerateService {
  pagerSubject = new BehaviorSubject<ListParams>({
    limit: 10,
    offset: 0,
  });
  pagerResetSubject = new BehaviorSubject<number>(0);
  private pagerCurrentLimit = 10;

  statsSubject = new BehaviorSubject<boolean>(true);
  private defaultDatasetSettings: ChartDataset = {
    label: 'Generated Integer',
    data: [],
    fill: false,
    borderColor: '#42A5F5',
    tension: 0.35,
    borderWidth: 1.2,
    pointBackgroundColor: '#fff',
  };

  constructor(private apiService: ApiService) {}

  getGeneratedListFirstPage(): void {
    this.pagerSubject.next({ offset: 0, limit: this.pagerCurrentLimit });
  }

  refreshStats(): void {
    this.statsSubject.next(true);
  }

  getStats(): Observable<ChartData> {
    return this.apiService
      .fetchRandomIntegerList({ offset: 0, limit: 20 })
      .pipe(
        map((res: PaginatedRandomIntegerList) => {
          let labels = new Array();
          let values = new Array();

          res.results.map((item: RandomInteger) => {
            const oldFormat = 'YYYY-MM-DDThh:mm:ssZZ';
            const newFormat = 'D MMM h:mm A';

            const label = dayjs(item.created, oldFormat).format(newFormat);

            labels.push(label);
            values.push(item.value);
          });

          return {
            labels,
            datasets: [
              {
                ...this.defaultDatasetSettings,
                data: values,
              },
            ],
          } as ChartData;
        })
      );
  }

  setPagerCurrentLimit(limit: number): void {
    this.pagerCurrentLimit = limit;
  }
}
