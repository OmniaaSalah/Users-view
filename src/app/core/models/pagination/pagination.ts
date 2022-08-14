

export interface Filter{
    searchText:string
}


export interface paginationState{
    first: number
    rows : number
    page : number
    pageCount: number
    totalRecords:number
}