import React, { useState } from "react";
import { AddressItem } from "../../types/type";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import {
  showErrorToast,
  showSuccessToast,
} from "../../components/ToastContainer";
import { addAddress } from "../../util/util";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";

const PINCODE_REGEX = /^\d{5,8}$/;

interface AddAddressModalProps {
  open: boolean;
  onClose: () => void;
}

const AddAddressModal: React.FC<AddAddressModalProps> = ({ open, onClose }) => {
  const authUser = useSelector((state: RootState) => state.authUser.authUser);
  const queryClient = useQueryClient();

  const [newAddress, setNewAddress] = useState<Omit<AddressItem, "id">>({
    name: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const addAddressMutation = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addresses", authUser.id],
      });
      showSuccessToast("Address added successfully");
      onClose();
    },
    onError: (error: Error) => {
      showErrorToast(error.message);
    },
  });

  const handleSubmit = async () => {
    try {
      if (!PINCODE_REGEX.test(newAddress.pincode)) {
        showErrorToast("Pincode must be a number between 5-8 digits");
        return;
      }
      await addAddressMutation.mutateAsync(newAddress);
      setNewAddress({
        name: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
      });
    } catch (error) {
      showErrorToast("Failed to save address");
    } finally {
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ color: "#FFA500" }}>Add New Address</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Recipient Name"
              value={newAddress.name}
              onChange={(e) =>
                setNewAddress({
                  ...newAddress,
                  name: e.target.value,
                })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#FFA500",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#FFA500",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Street"
              value={newAddress.street}
              onChange={(e) =>
                setNewAddress({ ...newAddress, street: e.target.value })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#FFA500",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#FFA500",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              value={newAddress.city}
              onChange={(e) =>
                setNewAddress({ ...newAddress, city: e.target.value })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#FFA500",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#FFA500",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="State"
              value={newAddress.state}
              onChange={(e) =>
                setNewAddress({ ...newAddress, state: e.target.value })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#FFA500",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#FFA500",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Pincode"
              value={newAddress.pincode}
              onChange={(e) =>
                setNewAddress({ ...newAddress, pincode: e.target.value })
              }
              error={
                !PINCODE_REGEX.test(newAddress.pincode) &&
                newAddress.pincode !== ""
              }
              helperText={
                !PINCODE_REGEX.test(newAddress.pincode) &&
                newAddress.pincode !== ""
                  ? "Pincode must be a number between 5-8 digits"
                  : ""
              }
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#FFA500",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#FFA500",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Country"
              value={newAddress.country}
              onChange={(e) =>
                setNewAddress({ ...newAddress, country: e.target.value })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#FFA500",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#FFA500",
                },
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            color: "#666",
            "&:hover": {
              backgroundColor: "#FFF4E0",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="outlined"
          disabled={!PINCODE_REGEX.test(newAddress.pincode)}
          sx={{
            color: "#FFA500",
            backgroundColor: "#FFF4E0",
            borderColor: "#FFA500",
            "&:hover": {
              backgroundColor: "#FFE4B5",
            },
            "&.Mui-disabled": {
              color: "#999",
              backgroundColor: "#f5f5f5",
              borderColor: "#ddd",
            },
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAddressModal;
