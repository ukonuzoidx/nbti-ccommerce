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
        findId.totalPrice = findId.offer_price * findId.quantity;
      } else {
        state.products.push(action.payload);
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
export const { addItemToCart, removeFromCart, emptyCart } = cart.actions;
export default cart.reducer;
