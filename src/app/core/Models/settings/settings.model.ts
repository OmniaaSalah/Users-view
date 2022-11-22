import { StatusEnum } from "src/app/shared/enums/status/status.enum";
import { Localization } from "../global/global.model";

export interface FileCondition{
    name:Localization
    type:string
    size:number,
}


export interface RequestCondition{
    requestName: string
    status: StatusEnum
    maxCount: number
    files: FileCondition[]
}