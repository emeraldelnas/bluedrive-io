import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from '@api/api.service';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { PaginatedRandomIntegerList } from '@models/paginated-random-integer-list';
import { RandomInteger } from '@models/random-integer';

import { map, Observable } from 'rxjs';

import * as dayjs from 'dayjs';
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, ChartModule, CardModule],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsComponent implements OnInit {
  statsData$!: Observable<ChartData>;
  defaultDatasetSettings: ChartDataset = {
    label: 'Generated Integer',
    data: [],
    fill: false,
    borderColor: '#42A5F5',
    tension: 0.35,
    borderWidth: 1.2,
    pointBackgroundColor: '#fff',
  };
  basicOptions: ChartOptions = {
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: {
          color: '#495057',
          maxRotation: 90,
          minRotation: 90,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.04)',
        },
      },
      y: {
        ticks: {
          color: '#495057',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.04)',
        },
      },
    },
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.statsData$ = this.apiService
      .getRandomIntegerList({ offset: 0, limit: 20 })
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
}
