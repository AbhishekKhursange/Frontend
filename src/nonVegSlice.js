import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiURL from "./axios";

export const getNonvegItems = createAsyncThunk(
  "nonveg/getNonvegItems",
  async (_, thunkAPI) => {
    try {
      const response = await apiURL.get("/api/v1/products/getNonvegItems");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Fetch failed");
    }
  }
);

const nonvegSlice = createSlice({
  name: "nonveg",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNonvegItems.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getNonvegItems.fulfilled, (state, action) => { state.loading = false; state.items = action.payload.items; })
      .addCase(getNonvegItems.rejected, (state, action) => { state.loading = false; state.error = action.payload?.message || "Failed to fetch nonveg items"; });
  }
});

export default nonvegSlice.reducer;
