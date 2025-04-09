import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { showInfoToast } from "../../components/ToastContainer";
import { AddressItem } from "../../types/type";

interface AddressState {
  addresses: AddressItem[];
}

const loadAddressesFromLocalStorage = (): AddressState => {
  const storedAddress = localStorage.getItem("address");
  if (storedAddress) {
    return { addresses: JSON.parse(storedAddress) };
  }
  return { addresses: [] };
};

const saveAddressToLocalStorage = (state: AddressState) => {
  localStorage.setItem("address", JSON.stringify(state.addresses));
};

const AddressSlice = createSlice({
  name: "address",
  initialState: loadAddressesFromLocalStorage,
  reducers: {
    addAddress: (state, action: PayloadAction<AddressItem>) => {
      state.addresses.push({ ...action.payload });
      saveAddressToLocalStorage(state);
      showInfoToast(`Address added succesfully`);
    },

    removeAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.filter(
        (address) => address.id !== action.payload
      );
      saveAddressToLocalStorage(state);
      showInfoToast(`Address removed succesfully`);
    },
  },
});

export const { addAddress, removeAddress } = AddressSlice.actions;

export default AddressSlice.reducer;
