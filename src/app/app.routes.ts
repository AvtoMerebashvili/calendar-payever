import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'booking',
    loadComponent: () =>
      import('./features/book-appointment/book-appointment.component').then(
        (c) => c.BookAppointmentComponent
      ),
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'booking',
    pathMatch: 'full',
  },
];
