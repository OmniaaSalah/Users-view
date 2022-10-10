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
    region?:string

    //Holiday
    Year?:string;
    CurriculumName?:string;
    HolidayStatus?:string;

    //index
    indexType?: string;
    indexStatus?: string;




}