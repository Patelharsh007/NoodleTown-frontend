import React, { useState } from "react";
import { AddressItem } from "../../types/type";
import {
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
  Stack,
  Divider,
  Paper,
} from "@mui/material";
import { Plus, X } from "lucide-react";
import AddressCard from "./AddressCard";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserAddresses, addAddress } from "../../util/util";
import {
  showErrorToast,
  showSuccessToast,
} from "../../components/ToastContainer";

const PINCODE_REGEX = /^\d{5,8}$/;

interface AddressSectionProps {
  addresses: AddressItem[];
  selectedAddressId: string | null;
  onSelectAddress: (addressId: string) => void;
}

const AddressSection: React.FC<AddressSectionProps> = ({
  addresses,
  selectedAddressId,
  onSelectAddress,
}) => {
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState<Omit<AddressItem, "id">>({
    recipientName: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const authUser = useSelector((state: RootState) => state.authUser.authUser);
  const queryClient = useQueryClient();

  const {
    data: addresses1,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["addresses", authUser.id],
    queryFn: getUserAddresses,
    staleTime: 5 * 60 * 1000,
  });

  const addAddressMutation = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addresses", authUser.id],
      });
      showSuccessToast("Address added successfully");
      setNewAddress({
        recipientName: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
      });
      setIsAddingAddress(false);
    },
    onError: (error) => {
      showErrorToast(error.message || "Failed to add address");
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate pincode
    if (!PINCODE_REGEX.test(newAddress.pincode)) {
      showErrorToast("Pincode must be a number between 5-8 digits");
      return;
    }

    addAddressMutation.mutate(newAddress);
  };

  const selectedAddress =
    addresses1 &&
    addresses1.find((addr: AddressItem) => addr.id === selectedAddressId);

  return (
    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Shipping Address
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body1" fontWeight={500} color="text.primary">
            Your Addresses
          </Typography>
          <Button
            onClick={() => setIsAddingAddress(!isAddingAddress)}
            variant="text"
            color="warning"
            startIcon={isAddingAddress ? <X /> : <Plus />}
          >
            {isAddingAddress ? "Cancel" : "Add New"}
          </Button>
        </Stack>

        {isAddingAddress ? (
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: 3,
              p: 2,
              borderRadius: 1,
              backgroundColor: "#F5F5F5",
              display: "grid",
              gap: 2,
            }}
          >
            <TextField
              label="Recipient Name"
              name="recipientName"
              value={newAddress.recipientName}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Street"
              name="street"
              value={newAddress.street}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              required
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label="City"
                name="city"
                value={newAddress.city}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                label="State"
                name="state"
                value={newAddress.state}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                required
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Pincode"
                name="pincode"
                value={newAddress.pincode}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                required
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
              />
              <TextField
                label="Country"
                name="country"
                value={newAddress.country}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                required
              />
            </Stack>
            <Button
              type="submit"
              variant="contained"
              color="warning"
              sx={{ mt: 2 }}
              fullWidth
            >
              Save Address
            </Button>
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            {addresses1 && addresses1.length > 0 ? (
              addresses1.map((address: AddressItem) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  isSelected={address.id === selectedAddressId}
                  onClick={() => onSelectAddress(address.id)}
                />
              ))
            ) : (
              <Box
                sx={{
                  py: 6,
                  textAlign: "center",
                  backgroundColor: "#F5F5F5",
                  borderRadius: 1,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  No addresses saved yet.
                </Typography>
              </Box>
            )}

            {!isAddingAddress && addresses.length === 0 && (
              <Button
                onClick={() => setIsAddingAddress(true)}
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                startIcon={<Plus />}
              >
                Add your first address
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default AddressSection;
