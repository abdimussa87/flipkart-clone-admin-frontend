import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios'


// creating thunk
export const fetchCategoriesAsync = createAsyncThunk('category/fetchCategoriesAsync', async ({ rejectWithValue }) => {
    try {
        const response = await axios.get('/categories');
        if (response.status === 200) {
            const categories = response.data;
            return categories;
        }
    } catch (error) {
        return rejectWithValue(error.response.data)
    }

});

export const createCategoryAsync = createAsyncThunk('/category/createCategoryAsync', async (form, { rejectWithValue }) => {
    try {

        const response = await axios.post('/categories', form);
        console.log(response);

    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        loading: false,
        error: null,
        message: null
    },
    reducers: {
    },
    extraReducers: {
        [fetchCategoriesAsync.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchCategoriesAsync.fulfilled]: (state, action) => {

            state.categories = action.payload;
            state.loading = false;
            state.error = null;

        },
        [fetchCategoriesAsync.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [createCategoryAsync.pending]: (state, action) => {
            state.loading = true;
        },
        [createCategoryAsync.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
        },
        [createCategoryAsync.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },

    }
});





// export const { isUserLoggedIn, logout } = userSlice.actions;

export const selectCategories = state => state.category.categories;

export default categorySlice.reducer;
