import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiURL from "./axios";

export const getVegItems = createAsyncThunk(
  "veg/getVegItems",
  async (_, thunkAPI) => {
    try {
      const response = await apiURL.get("/api/v1/products/getVegItems");
      return response.data; // { items: [...] }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Fetch failed");
    }
  }
);

const vegSlice = createSlice({
  name: "veg",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVegItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVegItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
      })
      .addCase(getVegItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch veg items";
      });
  }
});

export default vegSlice.reducer;
