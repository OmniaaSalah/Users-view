import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { AssessmentsEnum } from "src/app/shared/enums/subjects/assessment-type.enum";

export const degreesMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  const evaluationType = control.get('evaluationType');
  const minmumDegree = control.get('minmumDegree');
  const maximumDegree = control.get('maximumDegree');
  if(evaluationType.value==AssessmentsEnum.IPpoints||evaluationType.value==AssessmentsEnum.Grades)
  {return ( minmumDegree.value < maximumDegree.value)? null : {degreesMisMatch: true};}
  else
  {return null;}
};