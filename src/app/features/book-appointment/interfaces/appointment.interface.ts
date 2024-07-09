import { CdkDragEnd } from '@angular/cdk/drag-drop';

export interface IAppointmentBase {
  name: string;
}

export interface IAppointmentBooking extends IAppointmentBase {
  startTime: string;
  endTime: string;
  id?: number;
}

export interface IAppointment extends IAppointmentBase {
  id: number;
  startDate: Date;
  endDate: Date;
}

export interface IAppointmentOutput extends CdkDragEnd {
  itemId: number;
}
