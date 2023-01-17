import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const assesmentDegreesValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  
  const minmumDegree = control.get('min');
  const maximumDegree = control.get('max');
 

  {return (Number(minmumDegree.value) < Number(maximumDegree.value))? null : {degreesWrong: true};}

};