import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const degreesMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const minmumDegree = control.get('minmumDegree');
  const maximumDegree = control.get('maximumDegree');
console.log(minmumDegree.value < maximumDegree.value,minmumDegree.value , maximumDegree.value)
  return ( minmumDegree.value < maximumDegree.value)? null : {degreesMisMatch: true};
};