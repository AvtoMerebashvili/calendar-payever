import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Directive, signal } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Directive()
export abstract class DraggableComponent<T extends { id: number }> {
  protected _item$ = new ReplaySubject<T>();
  public item$ = this._item$.asObservable();

  public abstract cdkDragStarted: () => void;
  public abstract cdkDragEnded: (cdkDragEnd: CdkDragEnd, item: T) => void;
}
