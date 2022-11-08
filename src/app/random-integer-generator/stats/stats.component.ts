import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerateService } from 'src/app/services/generate/generate.service';

import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';

import { ChartData, ChartDataset, ChartOptions } from 'chart.js';

import { Observable, switchMap } from 'rxjs';

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

  constructor(private generateService: GenerateService) {}

  ngOnInit(): void {
    this.statsData$ = this.generateService.statsSubject.pipe(
      switchMap((res) => {
        return this.generateService.getStats();
      })
    );
  }
}
