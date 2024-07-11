import { AfterViewInit, Component, Injector } from '@angular/core';
import {
  AbstractControl,
  FormControlDirective,
  FormControlName,
  NgControl,
} from '@angular/forms';
import { BehaviorSubject, map } from 'rxjs';
import { ControlComponent } from './control.component';

@Component({
  template: '',
})
export class ValdationComponent
  extends ControlComponent
  implements AfterViewInit
{
  private parentControl!: AbstractControl;
  private isTouched$ = new BehaviorSubject(false);
  public validationMessage$ = this.isTouched$.pipe(
    map((isTouched) => {
      if (isTouched && this.parentControl.errors) {
        this.control.setErrors({ incorrect: true });
        const error = Object.keys(this.parentControl.errors)[0];
        return error;
      }
      return '';
    })
  );

  constructor(private injector: Injector) {
    super();
  }

  ngAfterViewInit(): void {
    try {
      const control = this.injector.get(NgControl);

      if (control instanceof FormControlDirective) {
        this.parentControl = control.form;
      }
      if (control instanceof FormControlName) {
        this.parentControl = control.control;
        this.enhanceFunctionality(control.control);
      }
    } catch (e) {
      console.log('error while getting the control');
    }
  }

  override registerOnTouched(fn: any): void {
    this.onTouch = () => {
      this.control.markAsTouched();
      this.isTouched$.next(true);
      return fn;
    };
  }

  private enhanceFunctionality(control: AbstractControl) {
    const originFunctionality = control['markAsTouched'];
    const enhancedFunctionality = () => {
      Object.call(control, originFunctionality);
      this.onTouch();
    };
    control['markAsTouched'] = enhancedFunctionality;
  }
}
