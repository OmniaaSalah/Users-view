
import { Localization } from "../global/global.model";

export interface IAnnualHoliday {
    id?:number,
    annualCalendar:Localization,
    year: string,
    holidayModels:IHoliday[] 
  }

  export interface IHoliday {
        name: Localization,
        dateFrom: string,
        dateTo: string,
        flexibilityStatus:number,
        curriculumIds: number[]
  }


