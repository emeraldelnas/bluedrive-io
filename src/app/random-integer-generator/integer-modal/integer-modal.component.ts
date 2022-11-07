import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RandomInteger } from '@models/random-integer';
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
