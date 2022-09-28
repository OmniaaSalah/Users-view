import { IHoliday } from "./iholiday";

export interface IAnnualHoliday {
    id:number;
   createdDate:string;
   year:string;
   holiday:IHoliday;
   smester:string;

}
