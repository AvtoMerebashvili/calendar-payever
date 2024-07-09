import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Directive, signal } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Directive()
export abstract class DraggableComponent<T extends { id: number }> {
  protected _item$ = new ReplaySubject<T>();
  public item$ = this._item$.asObservable();

  public isDragging = signal(false);
  public abstract cdkDragStarted: () => void;
  public abstract cdkDragEnded: (
    cdkDragEnd: CdkDragEnd,
    itemId: number
  ) => void;
}
