import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const degreesMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  const evaluationType = control.get('evaluationType');
  const minmumDegree = control.get('minmumDegree');
  const maximumDegree = control.get('maximumDegree');
  if(evaluationType.value==1||evaluationType.value==2)
  {return ( minmumDegree.value < maximumDegree.value)? null : {degreesMisMatch: true};}
  else
  {return null;}
};