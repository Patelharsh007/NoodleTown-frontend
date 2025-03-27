import { Box, Stack, TextField, Grid2, Button } from "@mui/material";
import React, { useState } from "react";
import { AddressItem, NewAddress } from "../types/type";
import { useDispatch } from "react-redux";
import { addAddress } from "../redux/slices/AddressSlice";

interface AddressFormProps {
  onSetSHowAddressForm: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onSetSHowAddressForm }) => {
  const dispatch = useDispatch();

  //New address when added
  const [newAddress, setNewAddress] = useState<NewAddress>({
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleAddAddress = () => {
    if (
      !newAddress.street ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.pincode
    ) {
      return;
    }
    const address: AddressItem = {
      id: String(Date.now()),
      ...newAddress,
    };
    dispatch(addAddress(address));
    setNewAddress({
      street: "",
      city: "",
      state: "",
      pincode: "",
    });
    onSetSHowAddressForm();
  };

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Stack spacing={2}>
          <TextField
            label="Street Address"
            fullWidth
            size="small"
            value={newAddress.street}
            onChange={(e) =>
              setNewAddress({
                ...newAddress,
                street: e.target.value,
              })
            }
          />
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6 }}>
              <TextField
                label="City"
                fullWidth
                size="small"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    city: e.target.value,
                  })
                }
              />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextField
                label="State"
                fullWidth
                size="small"
                value={newAddress.state}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    state: e.target.value,
                  })
                }
              />
            </Grid2>
          </Grid2>
          <TextField
            label="Pincode"
            fullWidth
            size="small"
            value={newAddress.pincode}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
              setNewAddress({
                ...newAddress,
                pincode: value,
              });
            }}
            error={newAddress.pincode !== "" && newAddress.pincode.length !== 6}
            helperText={
              newAddress.pincode !== "" && newAddress.pincode.length !== 6
                ? "Pincode must be 6 digits"
                : ""
            }
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
          />
          <Stack direction="row" spacing={2}>
            <Button
              onClick={() => onSetSHowAddressForm()}
              sx={{ color: "#666" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddAddress}
              sx={{
                backgroundColor: "#FFA500",
                color: "#fff",
                "&:hover": { backgroundColor: "#ff8c00" },
              }}
            >
              Save Address
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default AddressForm;
