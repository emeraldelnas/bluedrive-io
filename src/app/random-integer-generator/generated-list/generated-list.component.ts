import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadEvent } from 'primeng/api';
import { ApiService } from '@api/api.service';
import { GenerateService } from '@services/generate/generate.service';

import { GeneratorComponent } from '../generator/generator.component';
import { RandomInteger } from '@models/random-integer';
import { ListParams } from '@models/list-params';
import { PaginatedRandomIntegerList } from '@models/paginated-random-integer-list';

import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';

import { map, Observable, of, Subject, switchMap, tap } from 'rxjs';
@Component({
  selector: 'app-generated-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    GeneratorComponent,
    DynamicDialogModule,
  ],
  providers: [DialogService],
  templateUrl: './generated-list.component.html',
  styleUrls: ['./generated-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneratedListComponent implements OnInit, OnDestroy {
  integerList!: Observable<PaginatedRandomIntegerList>;
  isLoading = false;
  first!: number;
  rows!: number;

  // Trigger to unsubscribe observables
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private apiService: ApiService,
    public dialogService: DialogService,
    private cdr: ChangeDetectorRef,
    private generateService: GenerateService
  ) {
    this.rows = this.generateService.getPagerCurrentLimit();

    this.integerList = generateService.pagerSubject.pipe(
      switchMap((listParams: ListParams) => {
        return apiService.fetchRandomIntegerList(listParams).pipe(
          tap(() => {
            this.isLoading = false;
            this.first = listParams.offset;
          }),
          map((res) => {
            return res;
          })
        );
      })
    );
  }

  ngOnInit(): void {}

  loadNumbers(event: LazyLoadEvent): void {
    this.isLoading = true;
    this.generateService.setPagerCurrentLimit(event.rows!);
    this.generateService.pagerSubject.next({
      limit: event.rows!,
      offset: event.first!,
    });
  }

  trackByFunction = (index: number, item: RandomInteger) => {
    return item.created;
  };

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
