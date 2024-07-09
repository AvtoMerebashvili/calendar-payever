import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
  output,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DraggableComponent } from '../../../../shared/base/components/draggable.components';
import {
  IAppointment,
  IAppointmentDragging,
} from '../../interfaces/appointment.interface';
import { DRAGGABLE_TOKEN } from '../../../../shared/tokens/draggable-token';
import { AppointmentViewPipe } from '../../pipes/appointment-view.pipe';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [MatCardModule, CommonModule, AppointmentViewPipe],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss',
  providers: [
    {
      provide: DRAGGABLE_TOKEN,
      useExisting: forwardRef(() => AppointmentComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentComponent extends DraggableComponent<IAppointment> {
  @Input() set appointment(app: IAppointment) {
    this._item$.next(app);
  }
  @Output() draggingStarted = new EventEmitter<boolean>();
  @Output() appointmentDragged = new EventEmitter<IAppointmentDragging>();
  @Output() appointmentClicked = new EventEmitter();

  public override cdkDragStarted = () => this.draggingStarted.emit(true);
  public override cdkDragEnded = (
    cdkDragEnded: CdkDragEnd,
    item: IAppointment
  ) => {
    this.appointmentDragged.emit({ ...cdkDragEnded, ...item });
  };
}
