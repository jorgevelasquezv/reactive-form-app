import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``,
})
export class SwitchesPageComponent implements OnInit {
  public myForm: FormGroup = this.formBuilder.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue],
  });

  public person = {
    gender: 'F',
    wantNotifications: false,
  };

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.myForm.patchValue(this.person);
  }

  public get wantNotifications(): boolean {
    return (this.myForm.get('wantNotifications') as AbstractControl).value;
  }

  public isValidField(field: string): boolean {
    const validatedField = this.myForm.get(field);
    if (!validatedField) return false;
    return validatedField.touched && validatedField.invalid;
  }

  public onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const { termsAndConditions, ...rest } = this.myForm.value;
    this.person = rest;
    console.log(this.myForm.value);
    this.myForm.reset({
      gender: 'M',
      wantNotifications: true,
      termsAndConditions: false,
    });
  }
}
