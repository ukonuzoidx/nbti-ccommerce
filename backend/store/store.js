// Import thunk middleware

// Import all reducers created

import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../reducers/categorySlice";
import productReducer from "../reducers/prdouctSlice";
import sellingProductReducer from "../reducers/sProductReducer";
import singleCategoryReducer from "../reducers/singleCategoriesSlice";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    sProduct: sellingProductReducer,
    singleCategory: singleCategoryReducer,
  },
});

export default store;
