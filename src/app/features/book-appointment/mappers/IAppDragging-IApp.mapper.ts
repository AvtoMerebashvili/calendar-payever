import { getRandomId } from '../../../shared/utils/random-id.util';
import {
  IAppointment,
  IAppointmentDragging,
} from '../interfaces/appointment.interface';
import { IMapper } from './mapper.interface';

export class IAppDraggingToIAppClass
  implements IMapper<IAppointmentDragging, IAppointment>
{
  public map(draggedApp: IAppointmentDragging, selectedDate: Date) {
    const differenceInTime = calculateTimeByDragging(draggedApp.distance.y);

    const startHours = Number(
      draggedApp.startDate.getHours() + differenceInTime.hours
    );
    const startMins = Number(
      draggedApp.startDate.getMinutes() + differenceInTime.minutes
    );

    const startDate = new Date(
      new Date(selectedDate).setHours(startHours, startMins)
    );
    const endHours = Number(
      draggedApp.endDate.getHours() + differenceInTime.hours
    );
    const endMins = Number(
      draggedApp.endDate.getMinutes() + differenceInTime.minutes
    );
    const endDate = new Date(
      new Date(selectedDate).setHours(endHours, endMins)
    );

    return {
      startDate,
      endDate,
      name: draggedApp.name,
      id: draggedApp?.id || getRandomId(),
    };
  }
}

function calculateTimeByDragging(pixels: number) {
  return {
    hours: Math.trunc(Number(pixels / 60)),
    minutes: Number(pixels % 60),
  };
}
