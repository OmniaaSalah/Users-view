
import { Filter } from "../models/filter/filter"
import { paginationState } from "../models/pagination/pagination"

export const Filteration : Partial<Filter>={
    Keyword : "",
    Sortby: "",
    Page: "",
    Pagesize:"",
    Sortcolumn: "",
    Sortdirection: ""
}

export const paginationInitialState: paginationState = {
    first: 0,
    rows: 4,
    page: 1,
    pageCount: 0,
    totalRecords: 0
}