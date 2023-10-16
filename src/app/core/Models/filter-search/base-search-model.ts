
import { SearchModel } from "./filter-search.model"

export const BaseSearchModel : SearchModel={
    KeyWord : "",
    Page: 1,
    PageSize:  +localStorage.getItem('ItemsPerPage') || 6,
    SortBy: "",
    SortColumn: "",
    SortDirection: "",
    SortColumnName:""
}

