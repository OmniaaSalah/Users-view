import { MenuItem } from "primeng/api";

export interface IHeader {
    breadCrump: MenuItem[];
    mainTitle?: ITitle;
    subTitle?: ITitle;
    showContactUs?:boolean;
    showNoOfNotifications?:boolean;
    showNotificationActionBtn?:boolean;
    
}

export interface ITitle{
    main:string
    sub?:string
}
