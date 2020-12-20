import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import appReducer from '../features/appSlice'
import categoryReducer from '../features/categorySlice';
export default configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
    category: categoryReducer
  },
});
