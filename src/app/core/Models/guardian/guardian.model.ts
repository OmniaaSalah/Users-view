import { Localization } from "../global/global.model";

export interface Guardian{
    id:number
    name:Localization
    surname:Localization
    email:string
    mobile:string
    nationalityName:Localization
    childrenCount:number
}