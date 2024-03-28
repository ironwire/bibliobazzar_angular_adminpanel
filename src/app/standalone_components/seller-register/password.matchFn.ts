import { FormControl, ValidatorFn } from '@angular/forms';

export function isPasswordMatch(
  control: FormControl,
  matchControl: FormControl
) {
  return control?.value === matchControl?.value ? true : false;
}
