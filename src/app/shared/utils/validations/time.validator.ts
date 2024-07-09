import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function timeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const time = control.value.split(':');
    if (time.length == 1) {
      if (time[0] >= 24 || time[0] < 0)
        return {
          invalid: true,
        };
    } else if (time.length == 2) {
      if (time[0] >= 24 || time[0] < 0 || time[1] >= 60 || time[1] < 0)
        return {
          invalid: true,
        };
    } else if (time.length > 2) {
      return {
        invalid: true,
      };
    }

    return null;
  };
}
