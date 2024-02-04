export interface FetchBooksPaginatedAndFiltered {
    page : number
    perPage : number
    searchQuery?: string
    authorName?: string  
    categoryName?: string
    edition?: string
    publisher?: string
    sortBy?: string
    sortOrder?: "asc" | "desc"
}

export interface FetchSingleBook {
    ISBN : string
}

export interface FetchToken {
    email : string,
    password : string
}

export interface CreateUser {
    firstName: string,
    lastName: string,
    address: string,
    phoneNumber: string,
    email : string,
    password : string,
    avatar : string
}

export interface Updatebook {
    id : number,
    title?: string,
    edition?: string,
    category?: string,
    publisher?: string,
    description?: string,
    author?: string,
    img?: string
}

export interface CreateBook {
    ISBN : string
    title: string,
    edition: string,
    category: string,
    publisher: string,
    description: string,
    author: string,
    img: string
}