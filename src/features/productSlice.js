import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios'

// creating thunk
export const fetchProductsAsync = createAsyncThunk('product/fetchProductsAsync', async ({ rejectWithValue }) => {
    try {
        const response = await axios.get('/products');
        if (response.status === 200) {
            const products = response.data;
            return products;
        }
    } catch (error) {
        return rejectWithValue(error.response.data)
    }

});

const generateOneWayCategoriesList = (categories, oneWayCategorieslist = []) => {
    for (let cat of categories) {
        oneWayCategorieslist.push({ id: cat.id, name: cat.name });
        if (cat.children.length > 0) {
            generateOneWayCategoriesList(cat.children, oneWayCategorieslist);
        }
    }
    return oneWayCategorieslist;
}



export const createProductAsync = createAsyncThunk('/product/createProductAsync', async ({ form, categories }, { rejectWithValue }) => {
    try {

        const response = await axios.post('/products', form);
        const oneWayCategoriesList = generateOneWayCategoriesList(categories);
        return { product: response.data, categories: oneWayCategoriesList };

    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});




export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        loading: false,
        error: null,
        message: null
    },
    reducers: {
    },
    extraReducers: {
        [fetchProductsAsync.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchProductsAsync.fulfilled]: (state, action) => {
            state.products = action.payload;
            state.loading = false;
            state.error = null;
        },
        [fetchProductsAsync.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [createProductAsync.pending]: (state, action) => {
            state.loading = true;
        },
        [createProductAsync.fulfilled]: (state, action) => {

            const categories = action.payload.categories;
            const category = categories.find(cat => cat.id === action.payload.product.product.category)
            state.products = [...state.products, {
                ...action.payload.product.product,
                category: { _id: category.id, name: category.name }
            }]
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
