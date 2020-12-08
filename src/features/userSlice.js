import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios'


// creating thunk
export const loginAsync = createAsyncThunk('user/loginAsync', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post('/admin/signin', {
      email,
      password
    })
    if (response.status === 200) {
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { user, token };
    }
  } catch (error) {
    return rejectWithValue(error.response.data)
  }

})

export const signUpAsync = createAsyncThunk('user/singnUpAsync', async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post('/admin/signup', {
      firstName, lastName, email, password
    })
    if (response.status === 201) {
      const { message } = response.data;
      return { message };
    }

  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
    authenticated: false,
    authenticating: false,
    error: null,
    message: null
  },
  reducers: {
    isUserLoggedIn: (state) => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      if (token) {
        state.user = user;
        state.token = token;
        state.authenticated = true;
      } else {
        state.token = null;
        state.user = null;
        state.authenticated = false;
      }
    },
    logout: (state) => {
      state.user = null;
      state.user = null;
      state.authenticated = false;
      localStorage.clear();
    },
  },
  extraReducers: {
    [loginAsync.pending]: (state, action) => {
      state.authenticating = true;
    },
    [loginAsync.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.authenticated = true;
      state.authenticating = false;
      state.error = null;

    },
    [loginAsync.rejected]: (state, action) => {
      state.authenticating = false;
      state.error = action.payload;
    },
    [signUpAsync.pending]: (state, action) => {
      state.authenticating = true;
    },
    [signUpAsync.fulfilled]: (state, action) => {
      state.message = action.payload.message
      state.authenticating = false;
      state.error = null;
    },
    [signUpAsync.rejected]: (state, action) => {
      state.error = action.payload;
      state.authenticating = false;

    },
  }
});





export const { isUserLoggedIn, logout } = userSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// export const loginAsync = (user) => dispatch => {
//   dispatch(login(user));


// };


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUser = state => state.user.user;

export default userSlice.reducer;
