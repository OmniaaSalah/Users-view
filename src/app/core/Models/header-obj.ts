import { MenuItem } from "primeng/api";

export interface HeaderObj {
    breadCrump: MenuItem[];
    mainTitle?: Title;
    subTitle?: Title;
    showContactUs?:boolean;
    showNoOfNotifications?:boolean;
    showAcceptbtn?:boolean;
    showRejectbtn?:boolean;
}

export interface Title{
    main:string
    sub?:string
}
