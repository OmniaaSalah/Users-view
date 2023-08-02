export interface IRegistrationWay {
    notificationSource:string,  //Phone or email
    accountWay: string,
    soursGetway:SourceGatwayOTP
  }

  export enum SourceGatwayOTP{

    Registration = 1,
    ICA =2
  }
