import { iholiday } from "./iholiday";

export interface iannualholiday {
    id:number;
    phoneno:string;
    email:string;
    gender:string;
   nationality:string;
   year:Date;
   holiday:iholiday[];
   smester:string;

}
