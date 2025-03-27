import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { showSuccessToast } from "../../components/ToastContainer";
import { OrderItem } from "../../types/type";

interface OrderState {
  orders: OrderItem[];
}

const loadOrderFromLocalStorage = (): OrderState => {
  const storedOrder = localStorage.getItem("order");
  if (storedOrder) {
    return { orders: JSON.parse(storedOrder) };
  }
  return { orders: [] };
};

const saveOrderToLocalStorage = (state: OrderState) => {
  localStorage.setItem("order", JSON.stringify(state.orders));
};

const OrderSlice = createSlice({
  name: "order",
  initialState: loadOrderFromLocalStorage(),
  reducers: {
    placeOrder: (state, action: PayloadAction<OrderItem>) => {
      state.orders.push({ ...action.payload });
      showSuccessToast(`Order placed succesfully`);
      saveOrderToLocalStorage(state);
    },

    deleteOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter((item) => item.id !== action.payload);
      showSuccessToast(`Order deleted succesfully`);
      saveOrderToLocalStorage(state);
    },
    deleteAllOrder: (state) => {
      state.orders = [];
      showSuccessToast("The entire cart is Emptied. ");
      saveOrderToLocalStorage(state);
    },
  },
});

export const { placeOrder, deleteOrder, deleteAllOrder } = OrderSlice.actions;

export default OrderSlice.reducer;
