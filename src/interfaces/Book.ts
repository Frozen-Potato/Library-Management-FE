export interface Book {
    _id: string
    ISBN : string
    title: string,
    edition: string,
    category: Array<{
        _id: string,
        name: string
    }>
    publisher: string,
    description: string,
    author: Array<{
        _id: string,
        fullName: string
    }>
    img: string,
    availableCopies: Array<{
        total: number
    }>
}

export type SingleBook = Omit<Book, "availableCopies">
  