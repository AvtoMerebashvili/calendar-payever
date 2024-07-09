import { Pipe, PipeTransform } from '@angular/core';
import { IAppointment } from '../interfaces/appointment.interface';
import { IPositions } from '../../../shared/interfaces/position.interface';

@Pipe({
  name: 'position',
  standalone: true,
})
export class PositionPipe implements PipeTransform {
  transform(appointment: IAppointment): IPositions {
    const startHours = appointment.startDate.getHours() * 60;
    const startMinutes = appointment.startDate.getMinutes() * 0.6;
    const start = startHours + startMinutes;

    const endHours = appointment.endDate.getHours() * 60;
    const endMinutes = appointment.endDate.getMinutes() * 0.6;
    const end = endHours + endMinutes;

    //TODO fix styles to be flexible not hardwritten
    const padding = 25;
    const extraRow = 60;

    return {
      top: Math.round(start + padding + extraRow),
      height: Math.round(end - start),
    };
  }
}
