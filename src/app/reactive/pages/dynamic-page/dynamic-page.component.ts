import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``,
})
export class DynamicPageComponent {
  public myForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.formBuilder.array([
      ['Metal Gear Solid', Validators.required],
      ['The Legend of Zelda', Validators.required],
    ]),
    newFavoriteGame: [''],
  });

  constructor(private readonly formBuilder: FormBuilder) {}

  public onSubmit(): void {
    if (this.myForm.invalid) return this.myForm.markAllAsTouched();
    this.myForm.reset();
    this.favoriteGames.clear();
  }

  public get favoriteGames(): FormArray {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  public get favoriteGamesControls(): AbstractControl[] {
    return this.favoriteGames.controls;
  }

  public get newFavoriteGame(): AbstractControl {
    return this.myForm.get('newFavoriteGame') as AbstractControl;
  }

  public isValidField(field: string): boolean {
    const validatedField = this.myForm.get(field);
    if (!validatedField) return false;
    return validatedField.touched && validatedField.invalid;
  }

  public isValidFieldInArray(
    formArrayControl: AbstractControl[],
    index: number
  ): boolean {
    const validatedField = formArrayControl[index];
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

  public getErrorMessageInArray(
    formArrayControl: AbstractControl[],
    index: number
  ): string {
    const validatedField = formArrayControl[index];
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

  public onDeleteFavoriteGame(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  public onAddFavoriteGame(): void {
    if (this.newFavoriteGame.invalid)
      return this.newFavoriteGame.markAsTouched();
    if (this.newFavoriteGame.value === '') return;
    this.favoriteGames.push(
      this.formBuilder.control(this.newFavoriteGame.value, Validators.required)
    );
    this.newFavoriteGame.reset();
  }
}
