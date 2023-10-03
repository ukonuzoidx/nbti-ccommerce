import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  sProducts: [],
  error: "",
};

export const sellingProducts = createAsyncThunk(
  "sProduct/sellingProducts",
  async () => {
    const response = await axios;
    return axios
      .get("https://nbti.globalfood-s.com/public/api/products/selling")
      .then((response) => response.data.data);
  }
);

export const sProductSlice = createSlice({
  name: "sProduct",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(sellingProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(sellingProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.sProducts = action.payload;
      state.error = "";
    });
    builder.addCase(sellingProducts.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.products = [];
    });
  },
});

export default sProductSlice.reducer;

// // import * as constants from "../types/constants";

// // export const productListReducer = (state = { products: [] }, action) => {
// //   switch (action.type) {
// //     case constants.PRODUCT_LIST_REQUEST:
// //       return { loading: true, products: [] };
// //     case constants.PRODUCT_LIST_SUCCESS:
// //       return {
// //         loading: false,
// //         products: action.payload.products,
// //         pages: action.payload.pages,
// //         page: action.payload.page,
// //       };
// //     case constants.PRODUCT_LIST_FAIL:
// //       return { loading: false, error: action.payload };
// //     default:
// //       return state;
// //   }
// // };

// // export const productDetailsReducer = (state = { product: {} }, action) => {
// //   switch (action.type) {
// //     case constants.PRODUCT_DETAILS_REQUEST:
// //       return { loading: true, ...state };
// //     case constants.PRODUCT_DETAILS_SUCCESS:
// //       return { loading: false, product: action.payload };
// //     case constants.PRODUCT_DETAILS_FAIL:
// //       return { loading: false, error: action.payload };
// //     default:
// //       return state;
// //   }
// // };
