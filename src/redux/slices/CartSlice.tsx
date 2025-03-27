import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../../components/ToastContainer";
import { CartItem } from "../../types/type";

interface CartState {
  items: CartItem[];
}

const loadCartFromLocalStorage = (): CartState => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    return { items: JSON.parse(storedCart) };
  }
  return { items: [] };
};

const saveCartToLocalStorage = (state: CartState) => {
  localStorage.setItem("cart", JSON.stringify(state.items));
};

const CartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push({ ...action.payload, quantity: 1 });
      showSuccessToast(`${action.payload.name} added to cart succesfully`);
      saveCartToLocalStorage(state);
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity >= 5) {
        showErrorToast(`Maximum quantity limit (5) reached for ${item.name}`);
        return;
      }
      if (item) {
        item.quantity += 1;
        showInfoToast(`${item.name} quantity increased`);
        saveCartToLocalStorage(state);
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        showInfoToast(`${item.name} quantity decreased`);
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
        showSuccessToast(`${item?.name} removed from cart.`);
      }
      saveCartToLocalStorage(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      showInfoToast("The entire cart is Emptied. ");
      saveCartToLocalStorage(state);
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} = CartSlice.actions;

export default CartSlice.reducer;
