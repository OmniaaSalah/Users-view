
import { AbstractControl, ValidatorFn } from "@angular/forms";





export const DateValidator: ValidatorFn = (control: AbstractControl<any, any>): null | { [key: string]: boolean } => {

  const Year = control.get('year');
  const valYear = Year.value as string;
  var yearTo = "";
  var yearFrom = "";
  const holidayarr = control.get('holobj').value;
  var DateFrom: string = "";
  var DateTo: string = "";

  holidayarr.forEach(element => {
    DateFrom = Object.values(element)[3] as string;
    DateTo = Object.values(element)[4] as string;

    if (DateFrom != "" && DateTo != "") {
      yearTo = DateTo.toString().substring(11, 15);
      yearFrom = DateFrom.toString().substring(11, 15);

      if (yearFrom != valYear && yearTo != valYear) {

      }

    }

  });

  return (valYear == yearFrom && valYear == yearTo) ? null : { yearmatch: true };





};

