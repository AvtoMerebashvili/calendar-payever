import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  signal,
} from '@angular/core';
import { DraggableComponent } from '../../base/components/draggable.components';
import { DRAGGABLE_TOKEN } from '../../tokens/draggable-token';

@Component({
  selector: 'app-drag-and-drop',
  standalone: true,
  imports: [DragDropModule, CommonModule],
  templateUrl: './drag-and-drop.component.html',
  styleUrl: './drag-and-drop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragAndDropComponent<T extends { id: number }> {
  @ContentChild(DRAGGABLE_TOKEN)
  component!: DraggableComponent<T>;

  @Input() positions!: { height: number; top: number };

  public contentInitedSig = signal(false);
}
