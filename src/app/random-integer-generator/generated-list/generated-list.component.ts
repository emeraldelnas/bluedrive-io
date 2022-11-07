import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { LazyLoadEvent } from 'primeng/api';
import { ApiService } from '@api/api.service';
import { GeneratorComponent } from '../generator/generator.component';
import { RandomInteger } from '@models/random-integer';
import { PaginatedRandomIntegerList } from '@models/paginated-random-integer-list';
import { CardModule } from 'primeng/card';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';

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
  integerList!: PaginatedRandomIntegerList;
  isLoading = false;

  // Trigger to unsubscribe observables
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private apiService: ApiService,
    public dialogService: DialogService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.integerList = {
      count: 0,
      next: '',
      previous: '',
      results: [],
    };
  }

  loadNumbers(event: LazyLoadEvent): void {
    this.isLoading = true;
    const currentPage = event.first! / event.rows!;

    this.apiService
      .getRandomIntegerList({
        limit: event.rows!,
        offset: currentPage,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: PaginatedRandomIntegerList) => {
        this.integerList = res;
        this.isLoading = false;
        this.cdr.detectChanges();
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
