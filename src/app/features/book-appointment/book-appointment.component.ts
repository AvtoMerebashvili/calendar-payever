import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DragAndDropComponent } from '../../shared/components/drag-and-drop/drag-and-drop.component';
import { GridComponent } from '../../shared/components/grid/grid.component';
import { DatepickerComponent } from '../../shared/form/datepicker/datepicker.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { PositionPipe } from './pipes/position.pipe';
import { AppointmentService } from './services/appointment.service';
import { FacadeService } from './services/facade.service';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [
    CommonModule,
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
