import { IHoliday } from "./iholiday";

export interface IAnnualHoliday {
    id:number;
    phoneno:string;
    email:string;
    gender:string;
   nationality:string;
   year:Date;
   holiday:IHoliday[];
   smester:string;

}
