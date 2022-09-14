import { MenuItem } from "primeng/api";

export interface Iheader {
    breadCrump: MenuItem[];
    mainTitle?: Ititle;
    subTitle?: Ititle;
    showContactUs?:boolean;
    showNoOfNotifications?:boolean;
    showAcceptBtn?:boolean;
    showRejectBtn?:boolean;
}

export interface Ititle{
    main:string
    sub?:string
}
