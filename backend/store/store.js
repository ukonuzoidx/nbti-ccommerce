// Import thunk middleware

// Import all reducers created

import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../reducers/categorySlice";
import productReducer from "../reducers/prdouctSlice";
import sellingProductReducer from "../reducers/sProductReducer";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    sProduct: sellingProductReducer,

  },
});

export default store;
