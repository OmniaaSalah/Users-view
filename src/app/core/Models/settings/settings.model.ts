import { FileTypeEnum, FileExtentions } from "src/app/shared/enums/file/file.enum";
import { NotificationChannels } from "src/app/shared/enums/settings/settings.enum";
import { Localization } from "../global/global.model";

export interface FileRule{
    ruleFileId: number,
    name:Localization
    type:string
    size:number,
    uploadedFiles? :[]
}


export type  MapedFileRule={
    [Key in FileTypeEnum]:{
        extention: FileExtentions
        size:number
    }
}

export interface RequestRule{
    ruleId:number
    requestType: string
    isRequired: boolean
    filesCount: number
    files: FileRule[]
}


export interface Notification{
    id:number
    content:Localization
    channal:NotificationChannels
    recievedBy:Localization
    cause:string
}

