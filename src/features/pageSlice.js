import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios'
import { logout } from './userSlice'
// creating thunk
// export const fetchPagesAsync = createAsyncThunk('Page/fetchPagesAsync', async ({ rejectWithValue }) => {
//     try {
//         const response = await axios.get('/Pages');
//         if (response.status === 200) {
//             const Pages = response.data;
//             return Pages;
//         }
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }

// });

// const generateOneWayCategoriesList = (categories, oneWayCategorieslist = []) => {
//     for (let cat of categories) {
//         oneWayCategorieslist.push({ id: cat.id, name: cat.name });
//         if (cat.children.length > 0) {
//             generateOneWayCategoriesList(cat.children, oneWayCategorieslist);
//         }
//     }
//     return oneWayCategorieslist;
// }



export const createPageAsync = createAsyncThunk('/page/createPageAsync', async ({ form }, { rejectWithValue, dispatch }) => {
    try {

        const response = await axios.post('/admin/pages', form);
        return { message: response.data.message, page: response.data.page };

    } catch (error) {
        if (error.response.data.message.name === "TokenExpiredError") {
            dispatch(logout())
        }
        return rejectWithValue(error.response.data);
    }
});




export const pageSlice = createSlice({
    name: 'Page',
    initialState: {
        pages: [],
        loading: false,
        error: null,
        message: null
    },
    reducers: {
        clearMessage: state => {
            state.message = null
        }
    },
    extraReducers: {
        // [fetchPagesAsync.pending]: (state, action) => {
        //     state.loading = true;
        // },
        // [fetchPagesAsync.fulfilled]: (state, action) => {
        //     state.Pages = action.payload;
        //     state.loading = false;
        //     state.error = null;
        // },
        // [fetchPagesAsync.rejected]: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // },
        [createPageAsync.pending]: (state, action) => {
            state.loading = true;
        },
        [createPageAsync.fulfilled]: (state, action) => {
            state.pages = [];
            state.message = action.payload.message;
            state.loading = false;
            state.error = null;
        },
        [createPageAsync.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload

        },

    }
});





export const { clearMessage } = pageSlice.actions;

export const selectPages = state => state.Page.Pages;

export default pageSlice.reducer;
