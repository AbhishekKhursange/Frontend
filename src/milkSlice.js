import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiURL from "./axios";

export const getMilkItems = createAsyncThunk(
  "milk/getMilkItems",
  async (_, thunkAPI) => {
    try {
      const response = await apiURL.get("/api/v1/products/getMilkItems");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Fetch failed");
    }
  }
);

const milkSlice = createSlice({
  name: "milk",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMilkItems.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getMilkItems.fulfilled, (state, action) => { state.loading = false; state.items = action.payload.items; })
      .addCase(getMilkItems.rejected, (state, action) => { state.loading = false; state.error = action.payload?.message || "Failed to fetch milk items"; });
  }
});

export default milkSlice.reducer;
