import { SingleBook } from "./Book"

export interface ExtendedBooksInitialAdaptedState {
    singleBook ?: SingleBook | null | undefined,
    isLoading : boolean,
    error ?: string,
    page : number,
    perPage : number,
    totalPageCount : number,
    dataCount : number,
    singleBookCopies : number
}

export interface ExtendedCategoriesInitialAdaptedState {
    isLoading : boolean,
    error ?: string
}

export interface ExtendedCartInitialAdaptedState {
    totalItems : number,
    isLoading : boolean
    error ?: string
}