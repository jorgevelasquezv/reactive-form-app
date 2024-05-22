import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, delay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidatorService implements AsyncValidator {
  constructor() {}

  public validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    const email = control.value;
    const httpCallObservable = new Observable<ValidationErrors | null>(
      (observer) => {
        if (email === 'isaac@gmail.com') {
          observer.next({ emailTaken: true });
          observer.complete();
        }
        observer.next(null);
        observer.complete();
      }
    ).pipe(delay(3000));
    return httpCallObservable;
  }
}
