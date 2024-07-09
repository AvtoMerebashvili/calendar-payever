import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AppointmentComponent } from '../../shared/components/appointment/appointment.component';
import { DragAndDropComponent } from '../../shared/components/drag-and-drop/drag-and-drop.component';
import { GridComponent } from '../../shared/components/grid/grid.component';
import { DatepickerComponent } from '../../shared/form/datepicker/datepicker.component';
import { IAppointment } from './interfaces/appointment.interface';
import { AppointmentService } from './services/appointment.service';
import { FacadeService } from './services/facade.service';
import { StoreService } from './services/store.service';
import { PositionPipe } from './pipes/position.pipe';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [
    DragAndDropComponent,
    AppointmentComponent,
    GridComponent,
    DatepickerComponent,
    ReactiveFormsModule,
    PositionPipe,
    MatButtonModule,
  ],
  providers: [FacadeService, StoreService, AppointmentService],
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookAppointmentComponent {
  constructor(public facade: FacadeService) {}
}
