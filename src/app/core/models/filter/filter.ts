export interface Filter{
    KeyWord:string
    SortBy: string,
    Page: string,
    PageSize: string,
    SortColumn: string,
    SortDirection: string

    // schools
    status?:string
    city?:string
    state?: string
    course?:string

}