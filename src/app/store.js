import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import appReducer from '../features/appSlice'
import categoryReducer from '../features/categorySlice';
import productReducer from '../features/productSlice';
export default configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
    category: categoryReducer,
    product: productReducer
  },
});
