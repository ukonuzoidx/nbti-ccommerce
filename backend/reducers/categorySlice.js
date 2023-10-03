import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  category: [],
  error: "",
};

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async () => {
    const response = await axios;
    return axios
      .get("https://nbti.globalfood-s.com/public/api/categories")
      .then((response) => response.data.data);
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.error = "";
    });
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.category = [];
    });
  },
});

export default categorySlice.reducer;
