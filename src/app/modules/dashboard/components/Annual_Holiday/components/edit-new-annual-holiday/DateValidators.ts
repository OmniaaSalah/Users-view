import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const DateValidator: ValidatorFn = (control: AbstractControl<any,any>): { [key: string]: boolean } | { [key: string]: boolean } => {
  const Year = control.get('year');
  const valYear=Year.value;
  console.log("helo"+valYear );
  var firstValue=new Date();
  
  const DateFrom = control.get('holobj').value.reverse().find(t=>(t.dateFrom != "")) ;
  if(DateFrom!=null)
  { 
    firstValue = Object.values(DateFrom )[3] as Date;
    var year=firstValue.getFullYear();
    
}


return ( year == valYear)? null : {yearmatch: true};

  
  

};
