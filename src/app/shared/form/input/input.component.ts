import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  forwardRef,
  input,
} from '@angular/core';
import {
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Subscription, skip } from 'rxjs';
import { ControlComponent } from '../../base/components/control.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent
  extends ControlComponent
  implements OnInit, OnDestroy
{
  @Input() label!: string;
  @Input() placeHolder!: string;
  private _subscription!: Subscription;

  ngOnInit(): void {
    this._subscription = this.control.valueChanges
      .pipe(skip(1))
      .subscribe((v) => this.onChange(v));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
