import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RandomInteger } from '@models/random-integer';

import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-integer-modal',
  standalone: true,
  imports: [CommonModule, ButtonModule, RippleModule, ProgressSpinnerModule],
  templateUrl: './integer-modal.component.html',
  styleUrls: ['./integer-modal.component.scss'],
})
export class IntegerModalComponent implements OnInit {
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig<Observable<RandomInteger>>
  ) {}

  ngOnInit(): void {}

  close(): void {
    this.ref.close();
  }
}
