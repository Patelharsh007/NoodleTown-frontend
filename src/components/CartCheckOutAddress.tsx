import {
  Grid2,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Stack,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { removeAddress } from "../redux/slices/AddressSlice";
import { selectAddress } from "../redux/slices/SelectedAddressSlice";
import Remove from "@mui/icons-material/Remove";

import AddressForm from "../form/AddressForm";

const CartCheckOutAddress = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Redux
  const dispatch = useDispatch();

  const addressItems = useSelector((state: RootState) => state.address.items);

  const selectedAddress = useSelector(
    (state: RootState) => state.seletedAddress.item
  );

  const handleSelectAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = e.target.value;
    const selected = addressItems.find((address) => address.id === selectedId);
    if (selected) {
      dispatch(selectAddress(selected));
    }
  };

  const handleSetShowAddressForm = () => {
    setShowAddressForm(false);
  };

  return (
    <Grid2 size={{ xs: 12, md: 6 }}>
      <Typography
        fontFamily="Poppins"
        fontWeight={500}
        fontSize={{ xs: "20px", sm: "24px" }}
        marginBottom="20px"
      >
        Select Delivery Address
      </Typography>

      {/* Address List */}
      <RadioGroup
        value={selectedAddress?.id}
        onChange={(e) => handleSelectAddress(e)}
      >
        {addressItems.map((address) => (
          <Stack
            direction={"row"}
            marginBottom={"10px"}
            alignItems={"center"}
            key={address.id}
          >
            <FormControlLabel
              key={address.id}
              value={address.id}
              control={
                <Radio
                  sx={{
                    color: "#FFA500",
                    "&.Mui-checked": {
                      color: "#FFA500",
                    },
                  }}
                />
              }
              label={
                <Typography
                  fontFamily="Poppins"
                  fontSize={{ xs: "14px", sm: "16px" }}
                  color="#666"
                >
                  {`${address.street}, ${address.city}, ${address.state} - ${address.pincode}`}
                </Typography>
              }
            />
            <Box
              component={"button"}
              fontSize={"0px"}
              height={"30px"}
              borderColor={"transparent"}
              sx={{
                "&:hover": {
                  Color: "#f9f9f9",
                  backgroundColor: "#E8E8E8",
                },
              }}
              onClick={() => {
                dispatch(removeAddress(address.id));
              }}
            >
              <Remove
                fontSize={"small"}
                sx={{ margin: "0px", padding: "0px" }}
              />
            </Box>
          </Stack>
        ))}
      </RadioGroup>

      {showAddressForm ? (
        // Address form to add new address
        <AddressForm onSetSHowAddressForm={handleSetShowAddressForm} />
      ) : (
        <Button
          onClick={() => setShowAddressForm(true)}
          sx={{
            backgroundColor: "#FFA500",
            color: "#fff",
            mt: 2,
            "&:hover": { backgroundColor: "#ff8c00" },
          }}
        >
          Add New Address
        </Button>
      )}
    </Grid2>
  );
};

export default CartCheckOutAddress;
