import { combineReducers } from "redux";

// Import all reducers
import productReducer from "../reducers/productSlice";

const reducers = combineReducers({
  products: productReducer,
});

export default reducers;
