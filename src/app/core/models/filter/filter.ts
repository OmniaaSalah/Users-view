export interface Filter{
    KeyWord:string
    SortBy: string,
    Page: number,
    PageSize: number,
    SortColumn: string,
    SortDirection: string

    // schools
    status?:string
    city?:string
    state?: string
    course?:string

    //Holiday
    year?:string;
    curriculumName?:string;
    flexibilityStatus?:string;

    //index
    indexType?: string;
    indexStatus?: string;




}