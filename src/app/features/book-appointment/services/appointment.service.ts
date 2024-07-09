import { Dialog } from '@angular/cdk/dialog';
import { Injectable, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, delay, filter, finalize, map, take, tap } from 'rxjs';
import { AppointmentBookingComponent } from '../components/appointment-booking/appointment-booking.component';
import {
  IAppointment,
  IAppointmentBooking,
  IAppointmentDragging,
} from '../interfaces/appointment.interface';
import { IAppBookingToIAppClass } from '../mappers/IAppBooking-IApp.mapper';
import { IAppDraggingToIAppClass } from '../mappers/IAppDragging-IApp.mapper';
import { Mapper } from '../mappers/Mapper.class';
import { StoreService } from './store.service';

@Injectable()
export class AppointmentService {
  private isDragging = false;
  public dateControl = new FormControl<Date>(new Date());
  public selectedDateAppointments$ = new BehaviorSubject<IAppointment[]>([]);

  constructor(public dialog: Dialog, private store: StoreService) {
    this.dateControl.valueChanges
      .pipe(
        delay(0),
        tap((v) => this.store.setDate(v as Date)),
        tap((_) => this.selectedDateAppointments$.next(this.store.getAll()))
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
    this.selectedDateAppointments$.next(this.store.getAll());

    // this is because of angular dragAndDrop sets transform style to the draggable component and it just kills my positions for first time after dragging
    const currDate = this.dateControl.value;
    this.dateControl.setValue(new Date('1800/02/02'));
    this.dateControl.setValue(currDate);
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
          map((v) => {
            if (v === 'remove') {
              this.store.remove(appointment!.id);
              return false;
            }
            return v;
          }),
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
          finalize(() =>
            this.selectedDateAppointments$.next(this.store.getAll())
          ),
          finalize(() => (this.isDragging = false))
        )
        .subscribe();
  }
}
