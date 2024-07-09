import { Injectable } from '@angular/core';
import { AppointmentService } from './appointment.service';
import { IAppointmentOutput } from '../interfaces/appointment.interface';
import { StoreService } from './store.service';

@Injectable()
export class FacadeService {
  public dateControl = this.appointmentService.dateControl;
  public appointmentsSig = this.appointmentService.selectedDateAppointmentsSig;

  constructor(
    private appointmentService: AppointmentService,
    private storeService: StoreService
  ) {}

  public onAppointmentDrag(appointment: IAppointmentOutput) {
    this.appointmentService.onAppointmentDrag(appointment);
  }

  public onAppointmentClick(id: number) {
    this.appointmentService.onAppointmentClick(id);
  }

  public onNewAppointment() {
    this.appointmentService.onNewAppointment();
  }
}
