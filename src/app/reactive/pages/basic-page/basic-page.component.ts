import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``,
})
export class BasicPageComponent implements OnInit {
  public myForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  constructor(private readonly formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.myForm.reset({
      // name: 'Product name',
      // price: 100,
      // inStorage: 10,
    });
  }

  public isValidField(field: string): boolean {
    const validatedField = this.myForm.get(field);
    if (!validatedField) return false;
    return validatedField.touched && validatedField.invalid;
  }

  public getErrorMessage(field: string): string {
    const validatedField = this.myForm.get(field);
    if (!validatedField) return '';
    const errors = validatedField.errors;
    if (!errors) return '';
    for (const error of Object.keys(errors)) {
      switch (error) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          return 'This field must have at least 3 characters';
        case 'min':
          return 'This field must have a positive number';
      }
    }
    return '';
  }

  public onSave(): void {
    if (this.myForm.invalid) return this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
    this.myForm.reset({
      price: 0,
      inStorage: 0,
    });
  }
}
