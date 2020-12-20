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
        return response.data;

    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const buildUpdatedCategoriesList = (categories, newCategory) => {
    let categoryList = []
    console.log(newCategory);
    for (let cat of categories) {
        if (newCategory.parentId && cat.id === newCategory.parentId) {
            console.log('found');
            categoryList.push({
                ...cat, children: buildUpdatedCategoriesList([...cat.children, {
                    id: newCategory._id,
                    name: newCategory.name, parentId: newCategory.parentId
                }], newCategory)
            })
        } else {
            categoryList.push(
                { ...cat, children: cat.children && cat.children.length > 0 ? buildUpdatedCategoriesList(cat.children, newCategory) : [] }
            );
        }
    }
    return categoryList;
}


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
            state.categories = buildUpdatedCategoriesList(state.categories, action.payload.category);
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
