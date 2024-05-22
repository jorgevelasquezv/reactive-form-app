import { Component } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
// import * as customValidators from '../../../shared/validators/validators';
import { ValidatorService } from '../../../shared/services/validator.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``,
})
export class RegisterPageComponent {
  public registerForm: FormGroup = this.formBuilder.group(
    {
      name: [
        '',
        [
          Validators.required,
          // Validators.pattern(customValidators.firstNameAndLastNamePattern),
          Validators.pattern(this.validatorService.firstNameAndLastNamePattern),
        ],
      ],
      username: [
        '',
        [
          Validators.required,
          // customValidators.cantBeStrider,
          this.validatorService.cantBeStrider,
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          // Validators.pattern(customValidators.emailPattern),
          Validators.pattern(this.validatorService.emailPattern),
        ],
        [this.emailValidatorService],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: [
        this.validatorService.isFieldOneEqualToFieldTwo(
          'password',
          'confirmPassword'
        ),
      ],
    } as AbstractControlOptions
  );

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly validatorService: ValidatorService,
    private readonly emailValidatorService: EmailValidatorService
  ) {}

  public isValidField(field: string): boolean {
    return this.validatorService.isValidField(this.registerForm, field);
  }

  public onSubmit(): void {
    if (this.registerForm.invalid) {
      return this.registerForm.markAllAsTouched();
    }
    console.log(this.registerForm.value);
    this.registerForm.markAllAsTouched();
    this.registerForm.reset();
  }
}
