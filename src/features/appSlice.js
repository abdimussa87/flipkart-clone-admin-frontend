import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios'


export const getInitialDataAsync = createAsyncThunk('/app/getInitialDataAsync', async ({ rejectWithValue }) => {
    try {
        const response = await axios.get('/admin/initialData');
        const { categories, products } = response.data;
        return { categories, products };
    } catch (error) {
        return rejectWithValue(error.response.data);
    }

});



export const appSlice = createSlice({
    name: 'app',
    initialState: {
        selectedSidebarOption: 'home',
        categories: [],
        products: [],
        loading: false,
        error: null
    },
    reducers: {
        setSelectedSidebarOption: (state, action) => {
            state.selectedSidebarOption = action.payload
        },

    },
    extraReducers: {
        [getInitialDataAsync.pending]: (state, action) => {
            state.loading = true
        },
        [getInitialDataAsync.fulfilled]: (state, action) => {
            state.loading = false
            state.categories = action.payload.categories;
            state.products = action.payload.products;
            state.error = null;
        },
        [getInitialDataAsync.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload;
        }

    }

});

export const { setSelectedSidebarOption } = appSlice.actions;


export const selectSelectedSidebarOption = state => state.app.selectedSidebarOption;

export default appSlice.reducer;
