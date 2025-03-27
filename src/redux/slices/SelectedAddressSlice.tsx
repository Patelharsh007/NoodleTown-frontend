import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddressItem } from "../../types/type";

interface SelectedAddressState {
  item: AddressItem | null;
}

const initialState: SelectedAddressState = {
  item: null,
};

const SelectedAddressSlice = createSlice({
  name: "selectedaddress",
  initialState,
  reducers: {
    selectAddress: (state, action: PayloadAction<AddressItem>) => {
      state.item = { ...action.payload };
    },
    deselectAddress: (state) => {
      state.item = null;
    },
  },
});

export const { selectAddress, deselectAddress } = SelectedAddressSlice.actions;

export default SelectedAddressSlice.reducer;
