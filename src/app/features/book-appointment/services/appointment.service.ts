import { Dialog } from '@angular/cdk/dialog';
import { Injectable, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppointmentBookingComponent } from '../components/appointment-booking/appointment-booking.component';
import {
  IAppointment,
  IAppointmentBooking,
  IAppointmentOutput,
} from '../interfaces/appointment.interface';
import { StoreService } from './store.service';
import { Observable, filter, take, tap } from 'rxjs';
import { getRandomId } from '../../../shared/utils/random-id.util';

@Injectable()
export class AppointmentService {
  public dateControl = new FormControl<Date>(new Date());
  public selectedDateAppointmentsSig = signal<IAppointment[]>([]);

  constructor(public dialog: Dialog, private store: StoreService) {
    this.dateControl.valueChanges.subscribe((v) =>
      this.store.setDate(v as Date)
    );
  }

  onAppointmentDrag(appointment: IAppointmentOutput) {
    console.log(appointment);
  }

  onAppointmentClick(id: number) {
    this.handleBooking();
  }

  onNewAppointment() {
    this.handleBooking();
  }

  private buildAppointmentModel(app: IAppointmentBooking): IAppointment {
    const selectedDate = this.dateControl.value as Date;

    const startHours = Number(app.startTime.split(':')[0]);
    const startMins = Number(app.startTime.split(':')[1]);
    const startDate = new Date(selectedDate.setHours(startHours, startMins));

    const endHours = Number(app.endTime.split(':')[0]);
    const endMins = Number(app.endTime.split(':')[1]);
    const endDate = new Date(selectedDate.setHours(endHours, endMins));

    return {
      startDate,
      endDate,
      name: app.name,
      id: app?.id || getRandomId(),
    };
  }

  private handleBooking() {
    this.dialog
      .open(AppointmentBookingComponent)
      .closed.pipe(
        take(1),
        filter((v) => !!v),
        tap((app) =>
          this.store.set(this.buildAppointmentModel(app as IAppointmentBooking))
        ),
        tap((_) =>
          this.selectedDateAppointmentsSig.set(this.store.getAll() || [])
        )
      )
      .subscribe();
  }
}
