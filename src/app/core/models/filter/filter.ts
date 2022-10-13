export interface Filter{
    KeyWord:string
    SortBy: string,
    Page: number,
    PageSize: number,
    SortColumn: string,
    SortDirection: string

    // schools
    Status?:string
    City?:string
    curricuulumId?: string
    StateId?:string

    // students
    SchoolId?:string; 
    GradeId?:string;
    DivisionId?:string;
    TrackId?:string;
    NationalityId?:string;    
    IsPassed?:string;
    IsChildOfAMartyr?:boolean; 
    TalentId?:boolean;  
    withDisabilities?:boolean  
    
    
    //Holiday
    Year?:string;
    CurriculumName?:string;
    HolidayStatus?:string;





}