import { Filter, paginationState } from "../Models/pagination/pagination"

export const Filteration : Partial<Filter>={
    searchText : ''
}

export const paginationInitialState: paginationState = {
    first : 0,
    rows  : 4,
    page  : 1,
    pageCount :0,
    totalRecords:0
}