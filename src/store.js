import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./lib/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
