import { MenuItem } from "primeng/api";

export interface iheader {
    breadCrump: MenuItem[];
    mainTitle?: title;
    subTitle?: title;
    showContactUs?:boolean;
    showNoOfNotifications?:boolean;
    showAcceptbtn?:boolean;
    showRejectbtn?:boolean;
}

export interface title{
    main:string
    sub?:string
}
