import { Pipe, PipeTransform } from '@angular/core';
import { IAppointment } from '../interfaces/appointment.interface';

@Pipe({
  name: 'appointmentView',
  standalone: true,
})
export class AppointmentViewPipe implements PipeTransform {
  transform(value: IAppointment): unknown {
    return (
      value.startDate.getHours() +
      ':' +
      value.startDate.getMinutes() +
      ' - ' +
      value.endDate.getHours() +
      ':' +
      value.endDate.getMinutes()
    ).toString();
  }
}
