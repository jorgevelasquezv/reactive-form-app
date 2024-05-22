import { Injectable } from '@angular/core';
import {
  FormControl,
  ValidationErrors,
  FormGroup,
  AbstractControl,
} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorService {
  public firstNameAndLastNamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  public cantBeStrider = (control: FormControl): ValidationErrors | null => {
    const value = control.value;
    const isStrider = value?.trim().toLowerCase().includes('strider');
    return isStrider ? { isStrider: true } : null;
  };

  public isValidField(form: FormGroup, field: string): boolean {
    const validatedField = form.get(field);
    if (!validatedField) return false;
    return validatedField.touched && validatedField.invalid;
  }

  public isConfirmPasswordValid(
    password: string,
    confirmPassword: string
  ): boolean {
    return password === confirmPassword;
  }

  public isFieldOneEqualToFieldTwo(
    fieldOne: string,
    fieldTwo: string
  ): ValidationErrors | null {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const valueOne = formGroup.get(fieldOne)?.value;
      const valueTwo = formGroup.get(fieldTwo)?.value;
      if (valueOne !== valueTwo) {
        formGroup.get(fieldTwo)?.setErrors({ notEqual: true });
        return { notEqual: true };
      } else {
        formGroup.get(fieldTwo)?.setErrors(null);
        return null;
      }
    };
  }
}
