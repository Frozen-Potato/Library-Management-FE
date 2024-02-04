export interface PaginatedData<T> {
    data: [T],
    page: number,
    perPage: number,
    totalCount: number,
    totalPageCount: number
}