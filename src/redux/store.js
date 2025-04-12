import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartSlice';
import productReducer from '../redux/productsSlice';

export default configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
  }
})