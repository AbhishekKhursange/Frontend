import { configureStore, createSlice } from "@reduxjs/toolkit";
import vegReducer from "./vegSlice";
import nonVegReducer from "./nonVegSlice";
import milkReducer from "./milkSlice";

// Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], discount: 0 },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...action.payload, quantity: 1 });
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    applyDiscount: (state, action) => { state.discount = action.payload; },
    clearCart: (state) => { state.items = []; state.discount = 0; },
  }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, applyDiscount, clearCart } = cartSlice.actions;

export const store = configureStore({
  reducer: {
    veg: vegReducer,
    nonveg: nonVegReducer,
    milk: milkReducer,
    cart: cartSlice.reducer
  }
});
