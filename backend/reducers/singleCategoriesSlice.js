import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  singleCategory: [],
  error: "",
};

export const fetchSingleCategory = createAsyncThunk(
  "singleCategory/fetchSingleCategory",
  async (id) => {
    const response = await axios;
    console.log(id);
    return axios
      .get(`https://nbti.globalfood-s.com/public/api/category/${id}`)
      .then((response) => {
        console.log(response.data.data);
        return response.data.data;
      });
  }
);

export const singleCategorySlice = createSlice({
  name: "singleCategory",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchSingleCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchSingleCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.singleCategory = action.payload;
      state.error = "";
    });
    builder.addCase(fetchSingleCategory.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.singleCategory = [];
    });
  },
});

export default singleCategorySlice.reducer;
