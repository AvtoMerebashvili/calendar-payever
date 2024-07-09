import { Pipe, PipeTransform } from '@angular/core';
import { IAppointment } from '../interfaces/appointment.interface';
import { IPositions } from '../../../shared/interfaces/position.interface';

@Pipe({
  name: 'position',
  standalone: true,
})
export class PositionPipe implements PipeTransform {
  transform(appointment: IAppointment): IPositions {
    console.log(appointment.startDate.getMinutes());
    console.log(appointment);
    const startHours = appointment.startDate.getHours() * 60;
    const startMinutes = appointment.startDate.getMinutes();
    const start = startHours + startMinutes;

    const endHours = appointment.endDate.getHours() * 60;
    const endMinutes = appointment.endDate.getMinutes();
    const end = endHours + endMinutes;

    //TODO fix styles to be flexible not hardwritten
    const padding = 25;

    return {
      top: Math.round(start + padding),
      height: Math.round(end - start),
    };
  }
}
