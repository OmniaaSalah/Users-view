import { Iholiday } from "./iholiday";

export interface Iannualholiday {
    id:number;
    phoneno:string;
    email:string;
    gender:string;
   nationality:string;
   year:Date;
   holiday:Iholiday[];
   smester:string;

}
