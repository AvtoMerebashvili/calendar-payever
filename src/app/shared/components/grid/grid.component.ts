import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
  @Input() set rowsAmount(v: number) {
    const rows = Array.from({ length: v }, (_, id) => id);
    this.rowsSig.set(rows);
  }
  @Input() rowHeight = 0;

  public rowsSig = signal<number[]>([]);
}
