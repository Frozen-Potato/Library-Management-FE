import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"

import { ExtendedCategoriesInitialAdaptedState } from "../interfaces/InitialState"
import { Category } from "../interfaces/Category"
import { config } from "../config"
import { RootState } from "../storeConfig/store"

const extendedAdaptedState : ExtendedCategoriesInitialAdaptedState = {
    isLoading : false
}

const categoriesAdapter = createEntityAdapter<Category>({
    selectId: (category) => category._id,
    sortComparer: (a, b) => a.name.localeCompare(b.name)
})

const initialState = categoriesAdapter.getInitialState(extendedAdaptedState);

export const fetchCategories = createAsyncThunk(
    'fetchCategories',
    async(_, {rejectWithValue}) => {
        try {
            const jsonData = await fetch(`${config.dataAPI}categories`)
            const data: Category[] = await jsonData.json()
            return data
        } catch(e) {
            const error = e as Error
            return rejectWithValue(error.message)
        }
    }
)

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchCategories.fulfilled, (state, action) => {
            if (!(action.payload instanceof Error)){
                categoriesAdapter.setAll(state, action.payload)
                state.isLoading = false
            }
        })
        .addCase(fetchCategories.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(fetchCategories.rejected, (state , action) => {
            if (action.payload instanceof Error){
                state.isLoading = false
                state.error = action.payload.message
            }
        })
            
    },
})

export const categoriesSelector = categoriesAdapter.getSelectors((state: RootState) => state.categories)
export const getState = (state: RootState) => state;

export const categoriesReducer = categorySlice.reducer;
export default categoriesReducer;
