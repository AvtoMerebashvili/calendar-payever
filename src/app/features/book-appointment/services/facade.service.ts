import { Injectable } from '@angular/core';
import { AppointmentService } from './appointment.service';
import { IAppointmentDragging } from '../interfaces/appointment.interface';
import { StoreService } from './store.service';

@Injectable()
export class FacadeService {
  public dateControl = this.appointmentService.dateControl;
  public selectedDateAppointments$ =
    this.appointmentService.selectedDateAppointments$;

  constructor(
    private appointmentService: AppointmentService,
    private storeService: StoreService
  ) {}

  public onDraggingStarted() {
    this.appointmentService.onDraggingStarted();
  }

  public onAppointmentDrag(appointment: IAppointmentDragging) {
    this.appointmentService.onAppointmentDrag(appointment);
  }

  public onAppointmentClick(id: number) {
    this.appointmentService.onAppointmentClick(id);
  }

  public onNewAppointment() {
    this.appointmentService.onNewAppointment();
  }
}
