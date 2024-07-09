import { Pipe, PipeTransform } from '@angular/core';
import { IAppointment } from '../interfaces/appointment.interface';

@Pipe({
  name: 'appointmentView',
  standalone: true,
})
export class AppointmentViewPipe implements PipeTransform {
  transform(app: IAppointment): unknown {
    return (
      app.startDate.getHours() +
      ':' +
      app.startDate.getMinutes() +
      ' - ' +
      app.endDate.getHours() +
      ':' +
      app.endDate.getMinutes()
    ).toString();
  }
}
