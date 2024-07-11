import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { InputComponent } from '../../../../shared/form/input/input.component';
import { timeValidator } from '../../../../shared/utils/validations/time.validator';
import { IAppointment } from '../../interfaces/appointment.interface';

@Component({
  selector: 'app-appointment-booking',
  standalone: true,
  imports: [CommonModule, InputComponent, ReactiveFormsModule, MatButtonModule],
  templateUrl: './appointment-booking.component.html',
  styleUrl: './appointment-booking.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentBookingComponent implements OnInit {
  public form = this.formBuilder.group({
    name: new FormControl('', Validators.required),
    startTime: new FormControl('', [Validators.required, timeValidator()]),
    endTime: new FormControl('', [Validators.required, timeValidator()]),
  });

  isUpdateSig = signal(false);

  constructor(
    @Inject(DIALOG_DATA) private appointment: IAppointment,
    private dialogRef: DialogRef,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.appointment) {
      this.startTimeControl.setValue(
        this.getTimeFromDate(this.appointment.startDate)
      );
      this.endTimeControl.setValue(
        this.getTimeFromDate(this.appointment.endDate)
      );
      this.nameControl.setValue(this.appointment.name);
      this.isUpdateSig.set(true);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onRemove() {
    this.dialogRef.close('remove');
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close({
        ...this.form.value,
        id: this.appointment?.id || null,
      });
    }

    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
  }

  getTimeFromDate(date: Date) {
    return date.getHours() + ':' + date.getMinutes();
  }

  get startTimeControl() {
    return this.form.get('startTime') as FormControl;
  }
  get endTimeControl() {
    return this.form.get('endTime') as FormControl;
  }
  get nameControl() {
    return this.form.get('name') as FormControl;
  }
}
