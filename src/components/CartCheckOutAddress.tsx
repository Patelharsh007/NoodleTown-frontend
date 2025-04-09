import {
  Grid2,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Stack,
  Button,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { removeAddress } from "../redux/slices/AddressSlice";
import { selectAddress } from "../redux/slices/SelectedAddressSlice";
import Remove from "@mui/icons-material/Remove";

import AddressForm from "../form/AddressForm";
import { AddressItem } from "../types/type";

const CartCheckOutAddress = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Redux
  const dispatch = useDispatch();

  const addressItems = useSelector(
    (state: RootState) => state.address.addresses
  );
  const selectedAddress = useSelector(
    (state: RootState) => state.seletedAddress.item
  );

  const handleSelectAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = e.target.value;
    const selected = addressItems.find(
      (address: AddressItem) => address.id === selectedId
    );
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
      <RadioGroup value={selectedAddress?.id} onChange={handleSelectAddress}>
        {addressItems.map((address) => (
          <Paper
            key={address.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 2,
              marginBottom: 2,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor:
                selectedAddress?.id === address.id ? "#FFF4E5" : "white", // Highlight selected address
              "&:hover": {
                boxShadow: 6,
                cursor: "pointer",
              },
            }}
          >
            {/* Address Details Card */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormControlLabel
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
                    fontSize={16}
                  >{`Address`}</Typography>
                }
              />
              {/* Remove Button */}
              <IconButton
                onClick={() => dispatch(removeAddress(address.id))}
                sx={{
                  color: "red",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <Remove fontSize="small" />
              </IconButton>
            </Box>

            {/* Address Fields */}
            <Stack spacing={1} sx={{ marginTop: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" fontWeight="bold">
                  Street:
                </Typography>
                <Typography variant="body2">{address.street}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" fontWeight="bold">
                  City:
                </Typography>
                <Typography variant="body2">{address.city}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" fontWeight="bold">
                  State:
                </Typography>
                <Typography variant="body2">{address.state}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" fontWeight="bold">
                  Country:
                </Typography>
                <Typography variant="body2">{address.country}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" fontWeight="bold">
                  Pincode:
                </Typography>
                <Typography variant="body2">{address.pincode}</Typography>
              </Box>
            </Stack>
          </Paper>
        ))}
      </RadioGroup>

      {/* Add New Address Button */}
      {showAddressForm ? (
        // Address form to add a new address
        <AddressForm onSetShowAddressForm={handleSetShowAddressForm} />
      ) : (
        <Button
          onClick={() => setShowAddressForm(true)}
          sx={{
            backgroundColor: "#FFA500",
            color: "#fff",
            mt: 2,
            "&:hover": { backgroundColor: "#ff8c00" },
            borderRadius: 1,
            padding: "10px 20px",
          }}
        >
          Add New Address
        </Button>
      )}
    </Grid2>
  );
};

export default CartCheckOutAddress;
