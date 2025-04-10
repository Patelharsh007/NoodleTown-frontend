import {
  Box,
  Stack,
  Button,
  Typography,
  Modal,
  TextField,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import { AddressItem, NewAddress } from "../types/type";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, removeAddress } from "../redux/slices/AddressSlice";
import { RootState } from "../redux/Store";

interface AddressFormProps {
  onSetShowAddressForm: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onSetShowAddressForm }) => {
  const dispatch = useDispatch();

  const [newAddress, setNewAddress] = useState<NewAddress>({
    id: "",
    recipientName: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const [openModal, setOpenModal] = useState(false);

  // Get the list of addresses from the Redux store
  const addresses = useSelector((state: RootState) => state.address);

  const handleAddAddress = () => {
    if (
      !newAddress.recipientName ||
      !newAddress.street ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.country ||
      !newAddress.pincode
    ) {
      return;
    }

    const address: AddressItem = {
      ...newAddress,
      id: String(Math.random()),
    };
    dispatch(addAddress(address));
    setNewAddress({
      id: "",
      recipientName: "",
      street: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    });
    setOpenModal(false); // Close the modal after adding the address
  };

  const handleDeleteAddress = (id: string) => {
    dispatch(removeAddress(id));
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Stack spacing={2}>
        {/* Button to open the modal for adding a new address */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenModal(true)}
          sx={{ mt: 2 }}
        >
          Add New Address
        </Button>

        {/* Modal for adding a new address */}
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              padding: 4,
              borderRadius: "8px",
              width: "400px",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Add New Address
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Recipient Name"
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
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Country"
                  fullWidth
                  size="small"
                  value={newAddress.country}
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      country: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Pincode"
                  fullWidth
                  size="small"
                  value={newAddress.pincode}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/[^0-9]/g, "")
                      .slice(0, 6);
                    setNewAddress({
                      ...newAddress,
                      pincode: value,
                    });
                  }}
                  error={
                    newAddress.pincode !== "" && newAddress.pincode.length !== 6
                  }
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
              </Grid>
            </Grid>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button
                onClick={() => setOpenModal(false)}
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
          </Box>
        </Modal>
      </Stack>
    </Box>
  );
};

export default AddressForm;
