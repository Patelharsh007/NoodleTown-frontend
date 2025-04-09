import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Avatar,
  Button,
  Tabs,
  Tab,
  Paper,
  Grid,
  IconButton,
} from "@mui/material";
import { ShoppingCart, Logout, Lock, PhotoCamera } from "@mui/icons-material";
import OrderHistory from "./OrderHistory";
import AddressManager from "./AddressManager";
import PasswordDialog from "./UpdatePassword";
import { AddressItem, OrderItem, User } from "../../types/type";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../../components/ToastContainer";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    id: 1,
    userName: "John Doe",
    email: "john@example.com",
    profileImage: "",
  });
  const [tabValue, setTabValue] = useState(0);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [addresses, setAddresses] = useState<AddressItem[]>([]);

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleUpdateProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle profile image update
  };

  const handleLogout = () => {
    // Handle logout
  };

  const handleUpdatePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    try {
      // Handle password update logic here
      showSuccessToast("Password updated successfully");
    } catch (error) {
      showErrorToast("Failed to update password");
    }
  };

  const handleAddAddress = async (address: Omit<AddressItem, "id">) => {
    const newAddress: AddressItem = {
      ...address,
      id: Date.now().toString(),
    };
    setAddresses([...addresses, newAddress]);
  };

  const handleUpdateAddress = async (
    id: string,
    updatedAddress: Omit<AddressItem, "id">
  ) => {
    setAddresses(
      addresses.map((addr) =>
        addr.id === id ? { ...updatedAddress, id } : addr
      )
    );
  };

  const handleDeleteAddress = async (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            sx={{ textAlign: { xs: "center", sm: "left" } }}
          >
            <Box position="relative" display="inline-block">
              <Avatar
                src={user.profileImage || undefined}
                alt={user.userName || user.email}
                sx={{
                  width: { xs: 100, sm: 120 },
                  height: { xs: 100, sm: 120 },
                  mx: { xs: "auto", sm: 0 },
                  bgcolor: "primary.light",
                  color: "primary.contrastText",
                  fontSize: "2rem",
                  border: "2px solid",
                  borderColor: "primary.main",
                }}
              >
                {(user.userName || user.email).substring(0, 2).toUpperCase()}
              </Avatar>
              <IconButton
                component="label"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: { xs: "50%", sm: 0 },
                  transform: { xs: "translateX(50%)", sm: "translateX(0)" },
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              >
                <input
                  accept="image/*"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleUpdateProfileImage}
                />
                <PhotoCamera />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={8} md={9}>
            <Typography
              variant="h5"
              component="h1"
              fontWeight="bold"
              gutterBottom
              sx={{
                color: "text.primary",
                fontSize: { xs: "1.5rem", sm: "2rem" },
              }}
            >
              {user.userName || "Hello there!"}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              gutterBottom
              sx={{
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            >
              {user.email}
            </Typography>

            <Box sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<ShoppingCart />}
                onClick={() => navigate("/cart")}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  px: 3,
                }}
              >
                My Cart
              </Button>
              <Button
                variant="outlined"
                color="info"
                startIcon={<Lock />}
                onClick={() => setPasswordModalOpen(true)}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  px: 3,
                }}
              >
                Update Password
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  px: 3,
                }}
              >
                Logout
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="profile tabs"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
              fontSize: "1rem",
            },
          }}
        >
          <Tab label="Order History" />
          <Tab label="Addresses" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {tabValue === 0 ? (
            <OrderHistory orders={orders} />
          ) : (
            <AddressManager
              addresses={addresses}
              onAddAddress={handleAddAddress}
              onUpdateAddress={handleUpdateAddress}
              onDeleteAddress={handleDeleteAddress}
            />
          )}
        </Box>
      </Paper>

      <PasswordDialog
        open={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        onUpdatePassword={handleUpdatePassword}
      />
    </Container>
  );
};

export default UserProfile;
