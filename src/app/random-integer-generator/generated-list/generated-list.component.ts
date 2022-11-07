import { switchMap } from 'rxjs/operators';
import { PaginatedRandomIntegerListState } from './../state/paginated-random-integer-list.store';
import { PaginatedRandomIntegerListQuery } from './../state/paginated-random-integer-list.query';
import { PaginatedRandomIntegerListService } from './../state/paginated-random-integer-list.service';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  Inject,
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
import { Subject, takeUntil, Observable } from 'rxjs';
import { PaginatedRandomIntegerListStore } from '../state/paginated-random-integer-list.store';
import { RANDOM_INTEGER_PAGINATOR } from '../state/paginated-random-integer-list.paginator';
// import { PaginationResponse, PaginatorPlugin } from '@datorama/akita';

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
  // integerList!: Observable<PaginatedRandomIntegerList | undefined>;
  integerList!: PaginatedRandomIntegerList;
  isLoading = false;

  // pagination$!: Observable<PaginationResponse<PaginatedRandomIntegerListState>>;

  // Trigger to unsubscribe observables
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(RANDOM_INTEGER_PAGINATOR)
    private apiService: ApiService,
    public dialogService: DialogService,
    private cdr: ChangeDetectorRef,
    private paginatedListService: PaginatedRandomIntegerListService,
    private paginatedListStore: PaginatedRandomIntegerListStore,
    private paginatedListQuery: PaginatedRandomIntegerListQuery
  ) // public paginatorRef: PaginatorPlugin<PaginatedRandomIntegerListState>
  {}

  ngOnInit(): void {
    // this.pagination$ = this.paginatorRef.pageChanges.pipe(
    //   switchMap((page)=> {
    //     const reqFn = () => this.apiService.getRandomIntegerList({

    //       perPage: 10
    //     });

    //     return this.paginatorRef.getPage
    //   })
    // )

    this.loadNumbers({ first: 0, rows: 10 });
    // this.integerList = this.paginatedListService
    //   .get({
    //     limit: 10,
    //     offset: 0,
    //   })
    //   .pipe(takeUntil(this.destroy$));
    // this.integerList = this.paginatedListQuery.selectLast();
    // this.integerList = {
    //   count: 0,
    //   next: '',
    //   previous: '',
    //   results: [],
    // };
  }

  loadNumbers(event: LazyLoadEvent): void {
    // this.isLoading = true;
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

    // this.integerList = this.paginatedListService
    //   .get({
    //     limit: event.rows!,
    //     offset: currentPage,
    //   })
    //   .pipe(takeUntil(this.destroy$));
  }

  trackByFunction = (index: number, item: RandomInteger) => {
    return item.created;
  };

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
