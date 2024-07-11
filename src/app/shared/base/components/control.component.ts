import { Component } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';

@Component({
  template: '',
})
export class ControlComponent implements ControlValueAccessor {
  public control = new FormControl();

  public value!: any;
  public onChange!: (v: any) => {};
  public onTouch!: () => {};
  public disabled!: boolean;

  writeValue(obj: any): void {
    this.value = obj;
    this.control.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
