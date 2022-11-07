import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ApiService } from '@api/api.service';
import { RandomInteger } from '@models/random-integer';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IntegerModalComponent } from './random-integer-generator/integer-modal/integer-modal.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  randomInteger$!: Observable<RandomInteger>;
  isGenerateBtnLoading = false;

  // Trigger to unsubscribe observables
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private apiService: ApiService,
    public dialogService: DialogService,
    private cdr: ChangeDetectorRef,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  generateRandomInteger(): void {
    this.randomInteger$ = this.apiService.getGeneratedRandomInteger();
    this.openModal();
  }

  openModal(): void {
    const ref = this.dialogService.open(IntegerModalComponent, {
      data: this.randomInteger$,
      width: '25%',
      header: 'Generated Integer',
      contentStyle: { 'max-height': '300px', overflow: 'auto' },
      style: { 'align-text': 'center' },
      styleClass: 'text-center integer-modal',
      closable: false,
      baseZIndex: 10000,
    });

    this.isGenerateBtnLoading = true;

    ref.onClose.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.isGenerateBtnLoading = false;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
