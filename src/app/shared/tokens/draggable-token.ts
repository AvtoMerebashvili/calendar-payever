import { InjectionToken } from '@angular/core';
import { DraggableComponent } from '../base/components/draggable.components';

export const DRAGGABLE_TOKEN = new InjectionToken<
  DraggableComponent<{ id: number }>
>('');
