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

    //Holiday
    year?:string;
    curriculumName?:string;
    flexibilityStatus?:string;

    //index
    indexType?: string;
    indexStatus?: string;




}