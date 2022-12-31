import { StatusEnum } from "src/app/shared/enums/status/status.enum"

export interface Filter{
    KeyWord:string
    SortBy: string,
    Page: number,
    PageSize: number,
    SortColumn: string,
    SortDirection: string

    // schools
    Status?:StatusEnum |boolean
    City?:string
    CityId?:number
    curriculumId?: string
    StateId?:string
    jobtitelid?:number
    date?:string | Date
    gradeid?:number
    subjectid?:number,
    // students
    schoolYearId?:number
    SchoolId?:string;
    GradeId?:string;
    DivisionId?:string;
    TrackId?:string;
    NationalityId?:string;
    IsPassed?:string;
    IsChildOfAMartyr?:boolean;
    TalentId?:boolean;
    // withDisabilities?:boolean
    IsSpecialAbilities?:boolean
    IsInFusionClass?:boolean,
    IsSpecialClass?:boolean
    roleId?:string;
    StudentId?:number,
    semester?

    //Holiday
    Year?:string;
    CurriculumName?:string;
    HolidayStatus?:string;

    //Users
    isactive?:string;
    UserStatus?:string;
    UserRole?:string


    //Assessment
    status?:boolean |StatusEnum;
    isActive?:boolean|StatusEnum;

      //survey
      SurveyType?:string;
      SurveyStatus?:string;
  }


