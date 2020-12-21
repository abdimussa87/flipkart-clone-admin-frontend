import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios'


// creating thunk
// export const fetchCategoriesAsync = createAsyncThunk('category/fetchCategoriesAsync', async ({ rejectWithValue }) => {
//     try {
//         const response = await axios.get('/categories');
//         if (response.status === 200) {
//             const categories = response.data;
//             return categories;
//         }
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }

// });

export const createProductAsync = createAsyncThunk('/product/createProductAsync', async (form, { rejectWithValue }) => {
    try {

        const response = await axios.post('/products', form);
        return response.data;

    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// const buildUpdatedCategoriesList = (categories, newCategory) => {
//     let categoryList = []
//     for (let cat of categories) {
//         if (newCategory.parentId && cat.id === newCategory.parentId) {
//             categoryList.push({
//                 ...cat, children: buildUpdatedCategoriesList([...cat.children, {
//                     id: newCategory._id,
//                     name: newCategory.name, slug: newCategory.slug, parentId: newCategory.parentId
//                 }], newCategory)
//             })
//         } else {
//             categoryList.push(
//                 { ...cat, children: cat.children && cat.children.length > 0 ? buildUpdatedCategoriesList(cat.children, newCategory) : [] }
//             );
//         }
//     }
//     return categoryList;
// }


export const productSlice = createSlice({
    name: 'Product',
    initialState: {
        products: [],
        loading: false,
        error: null,
        message: null
    },
    reducers: {
    },
    extraReducers: {
        // [fetchCategoriesAsync.pending]: (state, action) => {
        //     state.loading = true;
        // },
        // [fetchCategoriesAsync.fulfilled]: (state, action) => {

        //     state.categories = action.payload;
        //     state.loading = false;
        //     state.error = null;

        // },
        // [fetchCategoriesAsync.rejected]: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // },
        [createProductAsync.pending]: (state, action) => {
            state.loading = true;
        },
        [createProductAsync.fulfilled]: (state, action) => {
            // state.categories = buildUpdatedCategoriesList(state.categories, action.payload.category);
            state.loading = false;
            state.error = null;
        },
        [createProductAsync.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },

    }
});





// export const { isUserLoggedIn, logout } = userSlice.actions;

export const selectProducts = state => state.product.products;

export default productSlice.reducer;
