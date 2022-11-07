

export interface IAnnualHoliday {
    id?:number;
    year?:string;
    annualCalendarName?:string;
    holidayList:IHoliday[];


  }

  export interface IHoliday {
    id?:number;
    arabicName?:string;
    dateFrom?: string;
    dateTo?: string;
    flexibilityStatus?: string
    curriculumName?: ICurriculum[];
    createdDate?:string;

  }

  export interface ICurriculum {
    id?:number;
    name?:string;

  }

