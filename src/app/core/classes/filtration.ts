
import { Filter } from "../models/filter/filter"
import { paginationState } from "../models/pagination/pagination"

export const Filtration : Partial<Filter>={
    KeyWord : "",
    SortBy: "",
    Page: 0,
    PageSize: 6,
    SortColumn: "",
    SortDirection: ""
    // Keyword=dolore do Excepteur&SortBy=dolore do Excepteur&Page=-27196594&PageSize=-27196594&SortColumn=dolore do 
}

export const paginationInitialState: paginationState = {
    first: 0,
    rows: 4,
    page: 1,
    pageCount: 0,
    totalRecords: 0
}