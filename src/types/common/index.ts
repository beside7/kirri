export interface Paging <T> {
    totalCounts: number,
    page: number,
    size: number,
    totalPages: number,
    elements: T[]
}

export interface ResType<T> {
    data: T,
    [key: string]: any
}