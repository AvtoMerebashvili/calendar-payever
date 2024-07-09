import { Dialog } from '@angular/cdk/dialog';
import { Injectable, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, map, take, tap } from 'rxjs';
import { getRandomId } from '../../../shared/utils/random-id.util';
import { AppointmentBookingComponent } from '../components/appointment-booking/appointment-booking.component';
import {
  IAppointment,
  IAppointmentBooking,
  IAppointmentDragging,
} from '../interfaces/appointment.interface';
import { StoreService } from './store.service';
import { Mapper } from '../../mappers/Mapper.class';
import { IAppDraggingToIAppClass } from '../../mappers/IAppDragging-IApp.mapper';
import { IAppBookingToIAppClass } from '../../mappers/IAppBooking-IApp.mapper';

@Injectable()
export class AppointmentService {
  isDragging = false;
  public dateControl = new FormControl<Date>(new Date());
  public selectedDateAppointmentsSig = signal<IAppointment[]>([]);

  constructor(public dialog: Dialog, private store: StoreService) {
    this.dateControl.valueChanges
      .pipe(
        tap((v) => this.store.setDate(v as Date)),
        tap((_) => this.selectedDateAppointmentsSig.set(this.store.getAll()))
      )
      .subscribe();
  }

  onDraggingStarted() {
    this.isDragging = true;
  }

  onAppointmentDrag(appointment: IAppointmentDragging) {
    // it needs to wait while
    setTimeout(() => (this.isDragging = false), 100);
    const mapper = new Mapper(new IAppDraggingToIAppClass());
    const model = mapper.map(appointment, this.dateControl.value as Date);
    this.store.set(model);
    this.selectedDateAppointmentsSig.set(this.store.getAll());
  }

  onAppointmentClick(id: number) {
    const appointment = this.store.get(id);
    this.handleBooking(appointment);
  }

  onNewAppointment() {
    this.handleBooking();
  }

  private handleBooking(appointment: IAppointment | null = null) {
    if (!this.isDragging)
      this.dialog
        .open(AppointmentBookingComponent, {
          data: appointment,
        })
        .closed.pipe(
          take(1),
          filter((v) => !!v),
          map((app) => {
            const mapper = new Mapper(new IAppBookingToIAppClass());
            const model = mapper.map(
              app as IAppointmentBooking,
              this.dateControl.value as Date
            );
            return model;
          }),
          tap((model) => this.store.set(model)),
          tap((_) => this.selectedDateAppointmentsSig.set(this.store.getAll())),
          tap((_) => (this.isDragging = false))
        )
        .subscribe();
  }
}
