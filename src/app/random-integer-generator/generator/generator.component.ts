import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [CommonModule, ButtonModule, RippleModule, CardModule],
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneratorComponent implements OnInit {
  @Output() action = new EventEmitter<boolean>();
  @Input() loading = false;

  constructor() {}

  ngOnInit(): void {}

  generateRandomInteger(): void {
    this.action.emit(true);
  }
}
