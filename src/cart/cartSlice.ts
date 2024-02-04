import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExtendedCartInitialAdaptedState } from "../interfaces/InitialState";
import { CartData, CartItem } from "../interfaces/Cart";
import { RootState } from "../storeConfig/store";
import axios from "axios";
import { config } from "../config";

const extendedAdaptedState : ExtendedCartInitialAdaptedState = {
    totalItems : 0,
    isLoading : false,
}

const cartAdapter = createEntityAdapter<CartItem>({
    selectId: (cartItem) => cartItem.bookId, 
    sortComparer: (a, b) => a.bookName.localeCompare(b.bookName)
})

const initialState = cartAdapter.getInitialState(extendedAdaptedState)

export const checkOut = createAsyncThunk(
    'checkout',
    async(_, {rejectWithValue, getState}) => {
        const state = getState() as RootState
        const cart = state.cart.entities
        const token = state.user.token
        const  borrowedBook : Record<string, any> = {}
        const convertedCart: string[] = []
        Object.keys(cart).forEach((key) => {
            if(key) {
                borrowedBook[key] = cart[key]?.quantity
            }
        })
        Object.keys(borrowedBook).forEach((key) => {
            for (let i = 1; i <= borrowedBook[key]; i++){
                convertedCart.push(key)
            }
        })
        try {
            const { data } = await axios.post(`${config.dataAPI}books/borrow`,{                
                    id: convertedCart                
                },{
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

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers: {
        increaseCount: (state, action : PayloadAction<CartData>) => {
            const { _id, title, ISBN } = action.payload;
            const existingBook = state.entities[_id]
            if (existingBook) {
                existingBook.quantity++
                cartAdapter.setOne(state, existingBook)
                state.totalItems++
            } else { 
                const newCartBook : CartItem = {
                    bookId : _id,
                    bookISBN : ISBN,
                    bookName : title,
                    quantity : 1,
                }
                cartAdapter.addOne(state, newCartBook);
                state.totalItems++
            }
        },
        decreaseCount: (state, action : PayloadAction<CartData>) => {
            const { _id } = action.payload;
            const existingBook = state.entities[_id]
            if (existingBook) {
                existingBook.quantity--
                existingBook.quantity === 0 ? cartAdapter.removeOne(state, _id) : cartAdapter.setOne(state, existingBook)
                state.totalItems--
            }
        },
        removeItem: (state, action: PayloadAction<CartData>) => {
            const { _id } = action.payload
            const existingBook = state.entities[_id]
            if (existingBook) {
                state.totalItems -= existingBook.quantity
                cartAdapter.removeOne(state, _id)
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(checkOut.fulfilled, (state, action) => {
                if (!(action.payload instanceof Error)){
                    cartAdapter.removeAll(state)
                    state.totalItems = 0
                }
            })
            .addCase(checkOut.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(checkOut.rejected, (state, action) => {
                if (action.payload instanceof Error){
                    state.isLoading = false
                    state.error = action.payload.message
                }
            })
    },
})

export const cartSelector = cartAdapter.getSelectors((state: RootState) => state.cart)
export const getState = (state: RootState) => state;
export const getQuantity = (state: RootState) => state.cart.totalItems;

export const cartReducer = cartSlice.reducer;
export const { increaseCount, decreaseCount, removeItem } = cartSlice.actions;
export default cartReducer;
