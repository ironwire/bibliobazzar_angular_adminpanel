import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-stepper',
  templateUrl: './custom-stepper.component.html',
  styleUrl: './custom-stepper.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomStepperComponent),
      multi: true,
    },
  ],
})
export class CustomStepperComponent {
  editionValue: number | null = null;
  onChange: any = () => { };
  onTouch: any = () => { };

  // -- ControlValueAccessor implementation --
  // Called when the form data model is updated programmatically
  writeValue(value: number): void {
    this.editionValue = value;
  }

  // Called when the form control is updated by the user
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Called when the form control loses focus
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  // Called when the form control is disabled in code
  setDisabledState(isDisabled: boolean): void {
    // You can implement this method if your control needs to be disabled
  }

  // -- Internal Stepper Implementation --
  // Increase stepper by one
  increment(): void {
    // Increments the value by 1 if it is not null, otherwise sets the value to 1.
    this.updateValue(this.editionValue !== null ? this.editionValue + 1 : 1);
  }

  // Decrease stepper by one
  decrement(): void {
    this.updateValue(this.editionValue <= 1 ? 1 : this.editionValue - 1);
  }

  // Handles setting the new value and notifying the form of the change
  updateValue(newValue: number | null): void {
    if (newValue !== this.editionValue) {
      this.editionValue = newValue;
      this.onChange(newValue);
      this.onTouch();
    }
  }
}
