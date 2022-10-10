import { paginationState } from "../models/pagination/pagination";

export const paginationInitialState: paginationState = {
    first: 0,
    rows: 6,
    page: 1,
    pageCount: 0,
    total: 0
}