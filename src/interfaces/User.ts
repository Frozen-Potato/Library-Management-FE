export interface User {
    _id : number,
    firstName : string,
    lastName : string,
    role : Array<{
        _id: string,
        title: string
    }>,
    email : string,
    avatar : string,
    address : string,
}

export interface JwtToken {
    token: string,
}

export interface fullUserData {
    _id : number,
    firstName : string,
    lastName : string,
    email : string,
    avatar : string,
    address : string,
    password : string,
    confirmedPassword : string
}

export type History = {
    borrowed_Date?: string
    returned_Date?: string
    returned?: boolean
    book?: {
        _id?: string
        title?: string
        img?: string
    }
}