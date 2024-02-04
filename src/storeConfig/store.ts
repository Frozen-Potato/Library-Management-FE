import { configureStore } from "@reduxjs/toolkit"
import booksReducer from "../books/bookSlice";
import categoriesReducer from "../categories/categorySlice";
import userReducer from "../user/userSlice";
import cartReducer from "../cart/cartSlice";

export const createStore = () => {
    return configureStore({
        reducer : {
            books: booksReducer,
            categories: categoriesReducer,
            user: userReducer,
            cart: cartReducer
        }
    })
}

const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;