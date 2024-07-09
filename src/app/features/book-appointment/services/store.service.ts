import { Injectable, signal } from '@angular/core';
import { IAppointment } from '../interfaces/appointment.interface';

@Injectable()
export class StoreService {
  private selectedDateSig = signal<Date>(new Date());
  private _store = new Map<number, IAppointment[]>([]);

  constructor() {}

  public get(id: number) {
    const currentAppointments = [...(this.getAll() || [])];
    const targetAppointment = currentAppointments.find((a) => a.id === id);
    return targetAppointment;
  }

  public getAll = () => this._store.get(this.getKey());

  public set(appointment: IAppointment) {
    console.log(appointment);
    const key = this.getKey();
    const currentAppointments = [...(this.getAll() || [])];
    const filteredAppoitnments = currentAppointments.filter(
      (app) => app.id !== appointment.id
    );
    filteredAppoitnments.push(appointment);

    this._store.set(key, filteredAppoitnments);
  }

  public setDate(date: Date) {
    this.selectedDateSig.set(date);
  }

  private getKey(): number {
    const chosenDate = this.selectedDateSig();
    const key =
      chosenDate.getDate() + chosenDate.getMonth() + chosenDate.getFullYear();
    return key;
  }
}
