export interface Filter{
    Keyword:string
    Sortby: string,
    Page: string,
    Pagesize: string,
    Sortcolumn: string,
    Sortdirection: string

    // schools
    status?:string
    city?:string
    state?: string
    course?:string

}