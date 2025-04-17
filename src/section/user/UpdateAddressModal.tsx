import React, { useState, useEffect } from "react";
import { AddressItem } from "../../types/type";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import {
  showErrorToast,
  showSuccessToast,
} from "../../components/ToastContainer";
import { updateAddress } from "../../util/util";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";

const PINCODE_REGEX = /^\d{5,8}$/;

interface UpdateAddressModalProps {
  open: boolean;
  onClose: () => void;
  address: AddressItem | null;
}

const UpdateAddressModal: React.FC<UpdateAddressModalProps> = ({
  open,
  onClose,
  address,
}) => {
  const authUser = useSelector((state: RootState) => state.authUser.authUser);
  const queryClient = useQueryClient();

  const [updatedAddress, setUpdatedAddress] = useState<Omit<AddressItem, "id">>(
    {
      recipientName: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    }
  );

  useEffect(() => {
    if (address) {
      setUpdatedAddress({
        recipientName: address.recipientName || "",
        street: address.street,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        country: address.country || "",
      });
    }
  }, [address]);

  const updateAddressMutation = useMutation({
    mutationFn: (data: { id: string; address: Partial<AddressItem> }) =>
      updateAddress(data.id, data.address),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addresses", authUser.id],
      });
      showSuccessToast("Address updated successfully");
      onClose();
    },
    onError: (error: Error) => {
      showErrorToast(error.message);
    },
  });

  const handleSubmit = async () => {
    if (!address) return;

    try {
      if (!PINCODE_REGEX.test(updatedAddress.pincode)) {
        showErrorToast("Pincode must be a number between 5-8 digits");
        return;
      }
      await updateAddressMutation.mutateAsync({
        id: address.id,
        address: updatedAddress,
      });
    } catch (error) {
      showErrorToast("Failed to update address");
    }
  };

  if (!address) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ color: "#FFA500" }}>Edit Address</DialogTitle>
      <DialogContent>
        {updateAddressMutation.isPending ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress sx={{ color: "#FFA500" }} />
          </Box>
        ) : updateAddressMutation.isError ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {updateAddressMutation.error.message}
          </Alert>
        ) : (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Recipient Name"
                value={updatedAddress.recipientName}
                onChange={(e) =>
                  setUpdatedAddress({
                    ...updatedAddress,
                    recipientName: e.target.value,
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
                value={updatedAddress.street}
                onChange={(e) =>
                  setUpdatedAddress({
                    ...updatedAddress,
                    street: e.target.value,
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                value={updatedAddress.city}
                onChange={(e) =>
                  setUpdatedAddress({ ...updatedAddress, city: e.target.value })
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
                value={updatedAddress.state}
                onChange={(e) =>
                  setUpdatedAddress({
                    ...updatedAddress,
                    state: e.target.value,
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Pincode"
                value={updatedAddress.pincode}
                onChange={(e) =>
                  setUpdatedAddress({
                    ...updatedAddress,
                    pincode: e.target.value,
                  })
                }
                error={
                  !PINCODE_REGEX.test(updatedAddress.pincode) &&
                  updatedAddress.pincode !== ""
                }
                helperText={
                  !PINCODE_REGEX.test(updatedAddress.pincode) &&
                  updatedAddress.pincode !== ""
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
                value={updatedAddress.country}
                onChange={(e) =>
                  setUpdatedAddress({
                    ...updatedAddress,
                    country: e.target.value,
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
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          disabled={updateAddressMutation.isPending}
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
          disabled={
            !PINCODE_REGEX.test(updatedAddress.pincode) ||
            updateAddressMutation.isPending
          }
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
          {updateAddressMutation.isPending ? (
            <CircularProgress size={24} sx={{ color: "#FFA500" }} />
          ) : (
            "Update"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateAddressModal;
