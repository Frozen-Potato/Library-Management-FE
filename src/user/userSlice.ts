import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { User } from "../interfaces/User"
import { CreateUser, FetchToken } from "../interfaces/APIQuerries"
import { config } from "../config"
import { RootState } from "../storeConfig/store"
import axios from "axios"
import { History } from "../interfaces/User"

interface UserInitialState {
    user : User | null,
    token: string | null,
    isLoggedIn : boolean,
    isLoading : boolean,
    error?: string,
    createStatus?: boolean,
    history: History[]
}

const initialState : UserInitialState = {
    user : null,
    token: null,
    isLoggedIn : false,
    isLoading : false,
    history : []
}

export const fetchToken = createAsyncThunk(
    'fetchToken',
    async({ email, password } : FetchToken, {rejectWithValue}) => {
        try {
            const { data } = await 
                axios.post(
                    `${config.dataAPI}users/signin`,                   
                    { "email" : email, "password" : password }
                )
            return data          
        } catch(e) {
            const error = e as Error
            return rejectWithValue(error.message)
        }
    }
)

export const fetchCurrentUser = createAsyncThunk(
    'fetchCurrentUser',
    async(_, {getState, rejectWithValue}) => {
        const state = getState() as RootState
        const token = state.user.token
        try {
            const { data } = await axios.get(
                `${config.dataAPI}users/profile`, 
                {
                    headers: {
                        "Authorization" : `Bearer ${token}`
                    }
                }
            )
            return data
        } catch(e) {
            const error = e as Error
            return rejectWithValue(error.message)
        }
    }
)

export const fetchBorrowHistory = createAsyncThunk(
    'fetchHistory',
    async(_, { getState, rejectWithValue }) => {
        const state = getState() as RootState
        const token = state.user.token
        try {
            const { data } = await axios.get(
                `${config.dataAPI}books/history`,
                {
                    headers: {
                        "Authorization" : `Bearer ${token}`
                    }
                }
            )
            console.log(data)
            return data
        } catch(e) {
            const error = e as Error
            return rejectWithValue(error.message)
        }
    }
)

export const returnBook = createAsyncThunk(
    'returnBook',
    async(bookId : string, { getState, rejectWithValue, dispatch }) => {
        const state = getState() as RootState
        const token = state.user.token
        try {
            const { data } = await axios.post(
                `${config.dataAPI}books/return`,
                {                
                    id: [bookId]                    
                },
                {
                    headers: {
                        "Authorization" : `Bearer ${token}`
                    },
                }
            )
            dispatch(fetchBorrowHistory())
            return data
        } catch(e) {
            const error = e as Error
            return rejectWithValue(error.message)
        }
    }
)

export const createUser = createAsyncThunk(
    'createUser',
    async ({ firstName, lastName, email, password, avatar, phoneNumber, address } : CreateUser, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                `${config.dataAPI}users/signup`,
                {   
                    "firstName": firstName,
                    "lastName" : lastName,
                    "email" : email,
                    "address" : address,
                    "phoneNumber": phoneNumber,
                    "password" : password,
                    "avatar" : avatar
                }
            )
            return data
        } catch(e) {
            const error = e as Error
            return rejectWithValue(error.message)
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false
            state.user = null
            state.token = null
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchToken.fulfilled, (state, action) => {
                if (!(action.payload instanceof Error)){
                    state.token = action.payload.accessToken
                    state.isLoggedIn = true
                    state.isLoading = false
                }
            })
            .addCase(fetchToken.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchToken.rejected, (state , action) => {
                if (action.payload instanceof Error){
                    state.error = action.payload.message
                    state.isLoading = false
                }
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                if (!(action.payload instanceof Error)){
                    state.user = action.payload
                    state.isLoading = false
                }
            })
            .addCase(fetchCurrentUser.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchCurrentUser.rejected, (state , action) => {
                if (action.payload instanceof Error){
                    state.error = action.payload.message
                    state.isLoading = false
                }
            })
            .addCase(fetchBorrowHistory.fulfilled, (state, action) => {
                if (!(action.payload instanceof Error)){
                    state.history = action.payload.history
                    state.isLoading = false
                }
            })
            .addCase(fetchBorrowHistory.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchBorrowHistory.rejected, (state , action) => {
                if (action.payload instanceof Error){
                    state.error = action.payload.message
                    state.isLoading = false
                }
            })
            .addCase(returnBook.fulfilled, (state, action) => {
                if (!(action.payload instanceof Error)){
                    state.isLoading = false
                }
            })
            .addCase(returnBook.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(returnBook.rejected, (state , action) => {
                if (action.payload instanceof Error){
                    state.error = action.payload.message
                    state.isLoading = false
                }
            })
            .addCase(createUser.fulfilled, (state, action) => {
                if (!(action.payload instanceof Error)){
                    state.createStatus = true
                    state.isLoading = false
                }
            })
            .addCase(createUser.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(createUser.rejected, (state , action) => {
                if (action.payload instanceof Error){
                    state.error = action.payload.message
                    state.isLoading = false
                }
            })
    }
})

export const getLoggedInStatus = (state: RootState) => state.user.isLoggedIn;
export const getUser = (state: RootState) => state.user.user;
export const getUserError = (state: RootState) => state.user.error;
export const getCreateStatus = (state: RootState) => state.user.createStatus;
export const getUserHistory = (state: RootState) => state.user.history

export const getState = (state: RootState) => state;

export const userReducer = userSlice.reducer;
export const { logout } = userSlice.actions;
export default userReducer;
