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

  public getAll = (): IAppointment[] => this._store.get(this.getKey()) || [];

  public set(appointment: IAppointment) {
    const key = this.getKey();
    const currentAppointments = [...(this.getAll() || [])];
    const filteredAppoitnments = currentAppointments.filter(
      (app) => app.id !== appointment.id
    );
    filteredAppoitnments.push(appointment);

    this._store.set(key, filteredAppoitnments);
  }

  public remove(id: number) {
    const currentAppointments = this._store.get(this.getKey());
    const filteredAppoitnments = currentAppointments?.filter(
      (ap) => ap.id !== id
    );
    this._store.set(this.getKey(), filteredAppoitnments || []);
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
