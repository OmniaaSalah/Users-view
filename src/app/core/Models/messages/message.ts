import { Localization } from "../global/global.model";

export interface IMessage {
    title:string;
    senderName:Localization;
    createdDate:Date;
    attachments:string[];


}
