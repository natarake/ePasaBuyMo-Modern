import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  products: [],
  quantity: 0,
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
      toast.success("Added to cart successfully");
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    removeFromCart: (state, action) => {
      let itemToRemove = {};
      const index = state.products.findIndex((item) => {
        if (item.id === action.payload) {
          itemToRemove = item;
        }
        return true;
      });
      state.products.splice(index, 1);
      state.quantity -= 1;
      state.total -= itemToRemove.price * itemToRemove.quantity;
      toast.success("Removed from cart successfully");
    },
  },
});

export const { addToCart, clearCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
