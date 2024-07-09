import { getRandomId } from '../../../shared/utils/random-id.util';
import {
  IAppointment,
  IAppointmentBooking,
} from '../interfaces/appointment.interface';
import { IMapper } from './mapper.interface';

export class IAppBookingToIAppClass
  implements IMapper<IAppointmentBooking, IAppointment>
{
  map(app: IAppointmentBooking, selectedDate: Date) {
    const startHours = Number(app.startTime.split(':')[0]);
    const startMins = Number(app.startTime.split(':')[1]);
    const startDate = new Date(selectedDate.setHours(startHours, startMins));

    const endHours = Number(app.endTime.split(':')[0]);
    const endMins = Number(app.endTime.split(':')[1]);
    const endDate = new Date(selectedDate.setHours(endHours, endMins));

    return {
      startDate,
      endDate,
      name: app.name,
      id: app?.id || getRandomId(),
    };
  }
}
