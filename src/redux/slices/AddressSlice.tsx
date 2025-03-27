import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { showInfoToast } from "../../components/ToastContainer";
import { AddressItem } from "../../types/type";

interface AddressState {
  items: AddressItem[];
}

const loadAddressesFromLocalStorage = (): AddressState => {
  const storedAddress = localStorage.getItem("address");
  if (storedAddress) {
    return { items: JSON.parse(storedAddress) };
  }
  return { items: [] };
};

const saveAddressToLocalStorage = (state: AddressState) => {
  localStorage.setItem("address", JSON.stringify(state.items));
};

const AddressSlice = createSlice({
  name: "address",
  initialState: loadAddressesFromLocalStorage,
  reducers: {
    addAddress: (state, action: PayloadAction<AddressItem>) => {
      state.items.push({ ...action.payload });
      saveAddressToLocalStorage(state);
      showInfoToast(`Address added succesfully`);
    },

    removeAddress: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (address) => address.id !== action.payload
      );
      saveAddressToLocalStorage(state);
      showInfoToast(`Address removed succesfully`);
    },
  },
});

export const { addAddress, removeAddress } = AddressSlice.actions;

export default AddressSlice.reducer;
