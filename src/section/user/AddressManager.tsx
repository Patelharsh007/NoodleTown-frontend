import { useState } from "react";
import { AddressItem } from "../../types/type";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { Trash, Edit, Plus, Home } from "lucide-react";
import {
  showSuccessToast,
  showErrorToast,
  showInfoToast,
} from "../../components/ToastContainer";

interface AddressManagerProps {
  addresses: AddressItem[];
  onAddAddress: (address: Omit<AddressItem, "id">) => Promise<void>;
  onUpdateAddress: (
    id: string,
    address: Omit<AddressItem, "id">
  ) => Promise<void>;
  onDeleteAddress: (id: string) => Promise<void>;
}

const INITIAL_ADDRESS = {
  street: "",
  city: "",
  state: "",
  pincode: "",
};

const AddressManager = ({
  addresses,
  onAddAddress,
  onUpdateAddress,
  onDeleteAddress,
}: AddressManagerProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddressId, setCurrentAddressId] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState(INITIAL_ADDRESS);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenAddressDialog = (address?: AddressItem) => {
    if (address) {
      setAddressForm({
        street: address.street,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
      });
      setCurrentAddressId(address.id);
      setIsEditing(true);
    } else {
      setAddressForm(INITIAL_ADDRESS);
      setCurrentAddressId(null);
      setIsEditing(false);
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !addressForm.street ||
      !addressForm.city ||
      !addressForm.state ||
      !addressForm.pincode
    ) {
      showInfoToast("Please fill in all address fields.");
      return;
    }

    setIsLoading(true);

    try {
      if (isEditing && currentAddressId) {
        await onUpdateAddress(currentAddressId, addressForm);
        showSuccessToast("Address updated");
      } else {
        await onAddAddress(addressForm);
        showSuccessToast("Address added");
      }
      setIsDialogOpen(false);
    } catch (error) {
      showErrorToast("Failed to save address. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await onDeleteAddress(id);
        showSuccessToast("Address deleted");
      } catch (error) {
        showErrorToast("Failed to delete address. Please try again.");
      }
    }
  };

  return (
    <Container sx={{ paddingY: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <Typography variant="h5" fontWeight="600">
          Saved Addresses
        </Typography>
        <Button
          variant="contained"
          onClick={() => handleOpenAddressDialog()}
          startIcon={<Plus size={16} />}
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          Add Address
        </Button>
      </Box>

      {addresses.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            padding: 4,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Home
            style={{
              margin: "0 auto",
              height: "48px",
              width: "48px",
              color: "rgba(0, 0, 0, 0.6)",
            }}
          />
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            No addresses yet
          </Typography>
          <Typography sx={{ color: "rgba(0, 0, 0, 0.6)", marginTop: 1 }}>
            Add your delivery address to make checkout easier
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 2,
            marginTop: 3,
          }}
        >
          {addresses.map((address) => (
            <Box
              key={address.id}
              sx={{
                position: "relative",
                padding: 3,
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  display: "flex",
                  gap: 1,
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleOpenAddressDialog(address)}
                  sx={{ minWidth: "32px", padding: 0.5 }}
                >
                  <Edit style={{ width: "16px", height: "16px" }} />
                  <span style={{ display: "none" }}>Edit</span>
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleDeleteAddress(address.id)}
                  sx={{ minWidth: "32px", padding: 0.5 }}
                >
                  <Trash style={{ width: "16px", height: "16px" }} />
                  <span style={{ display: "none" }}>Delete</span>
                </Button>
              </Box>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                {address.street}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                {address.city}, {address.state}
              </Typography>
              <Typography variant="body2">PIN: {address.pincode}</Typography>
            </Box>
          ))}
        </Box>
      )}

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogContent>
          <DialogTitle>
            {isEditing ? "Edit Address" : "Add New Address"}
          </DialogTitle>
          <form onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                label="Street Address"
                fullWidth
                id="street"
                value={addressForm.street}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, street: e.target.value })
                }
                placeholder="Street address"
                required
                sx={{ marginBottom: 2 }}
              />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                label="City"
                fullWidth
                id="city"
                value={addressForm.city}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, city: e.target.value })
                }
                placeholder="City"
                required
                sx={{ marginBottom: 2 }}
              />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                label="State"
                fullWidth
                id="state"
                value={addressForm.state}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, state: e.target.value })
                }
                placeholder="State"
                required
                sx={{ marginBottom: 2 }}
              />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                label="PIN Code"
                fullWidth
                id="pincode"
                value={addressForm.pincode}
                onChange={(e) =>
                  setAddressForm({ ...addressForm, pincode: e.target.value })
                }
                placeholder="PIN code"
                required
                sx={{ marginBottom: 2 }}
              />
            </Box>
            <DialogActions>
              <Button variant="outlined" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Address"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default AddressManager;
