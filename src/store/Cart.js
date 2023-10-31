import { createSlice } from "@reduxjs/toolkit";

//create action and reducer
export const cart = createSlice({
  name: "CART",
  initialState: {
    products: [],
  },
  reducers: {
    addItemToCart: (state, action) => {
      const findId = state.products.find(
        (items) => items.id === action.payload.id
      );
      if (findId) {
        findId.quantity += action.payload.quantity;
        findId.totalPrice += findId.price;
      } else {
        state.products.push(action.payload);
      }
    },
    removeItemFromCart: (state, action) => {
      const existItem = state.products.find(
        (item) => item.id === action.payload.id
      );
      if (existItem.quantity !== 1) {
        existItem.quantity -= 1;
        existItem.totalPrice -= existItem.price;
      } else {
        const newData = state.products.filter(
          (item) => item.id !== existItem.id
        );
        state.products = newData;
      }
    },
    removeFromCart: (state, action) => {
      const findId = state.products.find(
        (items) => items.id === action.payload
      );
      if (findId) {
        const filteredProduct = state.products.filter(
          (items) => items.id !== action.payload
        );
        state.products = filteredProduct;
      }
    },
    emptyCart: (state) => {
      state.products = [];
    },
  },
});
// Action creators are generated for each case reducer function
export const { addItemToCart, removeFromCart, emptyCart, removeItemFromCart } =
  cart.actions;
export default cart.reducer;
