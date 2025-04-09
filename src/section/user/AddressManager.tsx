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
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { MapPin, Plus, Pencil, Trash2 } from "lucide-react";

import {
  showErrorToast,
  showSuccessToast,
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

const AddressManager: React.FC<AddressManagerProps> = ({
  addresses,
  onAddAddress,
  onUpdateAddress,
  onDeleteAddress,
}) => {
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);
  const [editingAddress, setEditingAddress] = useState<AddressItem | null>(
    null
  );
  const [newAddress, setNewAddress] = useState<Omit<AddressItem, "id">>({
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const handleOpen = () => {
    setOpen(true);
    setEditingAddress(null);
    setNewAddress({
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    });
  };

  const handleClose = () => {
    setOpen(false);
    setEditingAddress(null);
  };

  const handleOpenDeleteDialog = (id: string) => {
    setAddressToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setAddressToDelete(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingAddress) {
        await onUpdateAddress(editingAddress.id, newAddress);
        showSuccessToast("Address updated successfully");
      } else {
        await onAddAddress(newAddress);
        showSuccessToast("Address added successfully");
      }
      handleClose();
    } catch (error) {
      showErrorToast("Failed to save address");
    }
  };

  const handleDelete = async () => {
    if (addressToDelete) {
      try {
        await onDeleteAddress(addressToDelete);
        showSuccessToast("Address deleted successfully");
        handleCloseDeleteDialog();
      } catch (error) {
        showErrorToast("Failed to delete address");
      }
    }
  };

  const handleEdit = (address: AddressItem) => {
    setEditingAddress(address);
    setNewAddress({
      street: address.street,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      country: address.country || "",
    });
    setOpen(true);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h6">My Addresses</Typography>
        <Button
          variant="contained"
          startIcon={<Plus />}
          onClick={handleOpen}
          sx={{ textTransform: "none" }}
        >
          Add New Address
        </Button>
      </Box>

      <Grid container spacing={3}>
        {addresses.map((address) => (
          <Grid item xs={12} sm={6} md={4} key={address.id}>
            <Box
              sx={{
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                position: "relative",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <MapPin size={20} style={{ marginRight: 8 }} />
                <Typography variant="subtitle1" fontWeight={500}>
                  {address.street}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" mb={1}>
                {address.city}, {address.state} - {address.pincode}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {address.country}
              </Typography>
              <Box
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  display: "flex",
                  gap: 1,
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => handleEdit(address)}
                  sx={{ color: "primary.main" }}
                >
                  <Pencil size={16} />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleOpenDeleteDialog(address.id)}
                  sx={{ color: "error.main" }}
                >
                  <Trash2 size={16} />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingAddress ? "Edit Address" : "Add New Address"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Street Address"
                  value={newAddress.street}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, street: e.target.value })
                  }
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="PIN Code"
                  value={newAddress.pincode}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, pincode: e.target.value })
                  }
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
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ textTransform: "none" }}
          >
            {editingAddress ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Address</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this address? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDeleteDialog}
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            sx={{ textTransform: "none" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddressManager;
