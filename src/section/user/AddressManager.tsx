import React, { useState } from "react";
import { AddressItem } from "../../types/type";
import {
  Button,
  Grid,
  Typography,
  IconButton,
  Box,
  Skeleton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert,
} from "@mui/material";
import { MapPin, Plus, Pencil, Trash2 } from "lucide-react";
import {
  showErrorToast,
  showSuccessToast,
} from "../../components/ToastContainer";
import { getUserAddresses, deleteAddress } from "../../util/util";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import AddAddressModal from "./AddAddressModal";
import UpdateAddressModal from "./UpdateAddressModal";

const AddressManager: React.FC = () => {
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

  const deleteAddressMutation = useMutation({
    mutationFn: (id: string) => deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["addresses", authUser.id],
      });
      showSuccessToast("Address deleted successfully");
      handleCloseDeleteDialog();
    },
    onError: (error: Error) => {
      showErrorToast(error.message);
    },
  });

  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);
  const [editingAddress, setEditingAddress] = useState<AddressItem | null>(
    null
  );

  const handleOpen = () => {
    setOpen(true);
    setEditingAddress(null);
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

  const handleDelete = async () => {
    if (addressToDelete) {
      try {
        await deleteAddressMutation.mutateAsync(addressToDelete);
      } catch (error) {
        showErrorToast("Failed to delete address");
      }
    }
  };

  const handleEdit = (address: AddressItem) => {
    setEditingAddress(address);
    setOpen(true);
  };

  return (
    <Box>
      <Box
        marginTop={"10px"}
        display={"flex"}
        justifyContent={"space-between"}
        mb={3}
      >
        <Typography variant="h6">My Addresses</Typography>
        <Button
          variant="outlined"
          startIcon={<Plus size={16} />}
          onClick={handleOpen}
          sx={{
            gap: 1,
            color: "#FFA500",
            backgroundColor: "#FFF4E0",
            borderColor: "#FFA500",
            "&:hover": {
              backgroundColor: "#FFE4B5",
            },
          }}
        >
          Add New Address
        </Button>
      </Box>

      <Grid container spacing={3}>
        {isLoading ? (
          <Grid container spacing={3} marginTop={"5px"}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    p: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    position: "relative",
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={20}
                    sx={{ mb: 2 }}
                  />
                  <Skeleton variant="text" width="80%" sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="60%" sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="50%" sx={{ mb: 1 }} />
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : error ? (
          <Grid item xs={12}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error.message}
            </Alert>
          </Grid>
        ) : addresses1 && addresses1.length === 0 ? (
          <Grid item xs={12}>
            <Alert severity="info" sx={{ mb: 2 }}>
              No addresses found. Add your first address!
            </Alert>
          </Grid>
        ) : (
          addresses1 &&
          addresses1.map((address: AddressItem) => (
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
                    {address.recipientName}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  {address.street}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  {address.city}, {address.state} - {address.pincode}
                </Typography>
                {address.country && (
                  <Typography variant="body2" color="text.secondary">
                    {address.country}
                  </Typography>
                )}
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
                    sx={{ color: "#FFA500" }}
                  >
                    <Pencil size={16} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDeleteDialog(address.id)}
                    sx={{ color: "#FF5252" }}
                  >
                    <Trash2 size={16} />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))
        )}
      </Grid>

      <AddAddressModal open={open && !editingAddress} onClose={handleClose} />
      <UpdateAddressModal
        open={open && !!editingAddress}
        onClose={handleClose}
        address={editingAddress}
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ color: "#FFA500" }}>Delete Address</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this address? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDeleteDialog}
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
            variant="outlined"
            color="error"
            onClick={handleDelete}
            sx={{
              color: "#FF5252",
              backgroundColor: "#FFEBEE",
              borderColor: "#FF5252",
              "&:hover": {
                backgroundColor: "#FFCDD2",
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddressManager;
