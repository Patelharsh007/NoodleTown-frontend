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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  ShoppingCart,
  Logout,
  Lock,
  Visibility,
  VisibilityOff,
  PhotoCamera,
} from "@mui/icons-material";
import OrderHistory from "./OrderHistory";
import AddressManager from "./AddressManager";
import { AddressItem, OrderItem, User } from "../../types/type";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../../components/ToastContainer";

// Sample data for demonstration
const sampleUser: User = {
  id: 1,
  userName: "John Doe",
  email: "john.doe@example.com",
  profileImage: null,
  createdAt: new Date(),
};

const sampleAddresses: AddressItem[] = [
  {
    id: "1",
    street: "123 Main Street",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
  },
  {
    id: "2",
    street: "456 Park Avenue",
    city: "Delhi",
    state: "Delhi",
    pincode: "110001",
  },
];

const sampleOrders: OrderItem[] = [
  {
    id: 1001,
    status: "completed",
    user_email: "ptl",
    orderedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    subTotal: 850,
    discount: 50,
    total: 800,
    address: {
      id: "1",
      street: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
    },
    items: [
      {
        id: "item1",
        itemName: "Butter Chicken",
        quantity: 1,
        price: 350,
        itemTotal: 350,
      },
      {
        id: "item2",
        itemName: "Garlic Naan",
        quantity: 2,
        price: 50,
        itemTotal: 100,
      },
      {
        id: "item3",
        itemName: "Pulao Rice",
        quantity: 1,
        price: 200,
        itemTotal: 200,
      },
      {
        id: "item4",
        itemName: "Gulab Jamun",
        quantity: 2,
        price: 100,
        itemTotal: 200,
      },
    ],
  },
  {
    id: 1002,
    user_email: "ptl",
    status: "pending",
    orderedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    subTotal: 400,
    discount: 0,
    total: 400,
    address: {
      id: "2",
      street: "456 Park Avenue",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
    },
    items: [
      {
        id: "item5",
        itemName: "Margherita Pizza",
        quantity: 1,
        price: 300,
        itemTotal: 300,
      },
      {
        id: "item6",
        itemName: "Garlic Bread",
        quantity: 1,
        price: 100,
        itemTotal: 100,
      },
    ],
  },
  {
    id: 1003,
    status: "cancelled",
    user_email: "ptl",
    orderedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    subTotal: 600,
    discount: 100,
    total: 500,
    address: {
      id: "2",
      street: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
    },
    items: [
      {
        id: "item7",
        itemName: "Chicken Biryani",
        quantity: 2,
        price: 250,
        itemTotal: 500,
      },
      {
        id: "item8",
        itemName: "Raita",
        quantity: 1,
        price: 100,
        itemTotal: 100,
      },
    ],
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Profile = () => {
  const [user, setUser] = useState<User>(sampleUser);
  const [orders, setOrders] = useState<OrderItem[]>(sampleOrders);
  const [addresses, setAddresses] = useState<AddressItem[]>(sampleAddresses);
  const [tabValue, setTabValue] = useState(0);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleUpdateProfileImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({
          ...user,
          profileImage: reader.result as string,
        });
        showSuccessToast("Your profile image has been updated successfully.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    showSuccessToast("You have been logged out successfully.");
    navigate("/");
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      showErrorToast("New password and confirmation password must match.");
      return;
    }

    if (newPassword.length < 8) {
      showInfoToast("Password must be at least 8 characters long.");
      return;
    }

    try {
      setIsLoading(true);
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          console.log("Password updated:", { currentPassword, newPassword });
          resolve();
        }, 1000);
      });
      showSuccessToast("Your password has been updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordModalOpen(false);
    } catch (error) {
      showErrorToast("Failed to update password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAddress = async (address: Omit<AddressItem, "id">) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newAddress: AddressItem = {
          id: `addr-${Date.now()}`,
          ...address,
        };
        setAddresses([...addresses, newAddress]);
        resolve();
      }, 1000);
    });
  };

  const handleUpdateAddress = async (
    id: string,
    address: Omit<AddressItem, "id">
  ) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setAddresses(
          addresses.map((addr) =>
            addr.id === id ? { ...addr, ...address } : addr
          )
        );
        resolve();
      }, 1000);
    });
  };

  const handleDeleteAddress = async (id: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setAddresses(addresses.filter((addr) => addr.id !== id));
        resolve();
      }, 1000);
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ mb: 4, p: 3, borderRadius: 2 }}>
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
                  bgcolor: "#f5f5f5",
                  color: "#9b87f5",
                  fontSize: "2rem",
                  border: "2px solid #e0e0e0",
                }}
              >
                {(user.userName || user.email).substring(0, 2).toUpperCase()}
              </Avatar>
              <Box
                component="label"
                htmlFor="icon-button-file"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: { xs: "50%", sm: 0 },
                  transform: { xs: "translateX(50%)", sm: "translateX(0)" },
                  bgcolor: "#9b87f5",
                  borderRadius: "50%",
                  p: 0.5,
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#7E69AB" },
                }}
              >
                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleUpdateProfileImage}
                />
                <PhotoCamera sx={{ color: "white", fontSize: 20 }} />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={8} md={9}>
            <Typography
              variant="h5"
              component="h1"
              fontWeight="bold"
              gutterBottom
              align={window.innerWidth < 600 ? "center" : "left"}
            >
              {user.userName || "Hello there!"}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              gutterBottom
              align={window.innerWidth < 600 ? "center" : "left"}
            >
              {user.email}
            </Typography>

            <Grid
              container
              spacing={2}
              justifyContent={{ xs: "center", sm: "flex-start" }}
              sx={{ mt: 2 }}
            >
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<ShoppingCart />}
                  onClick={() => navigate("/cart")}
                >
                  My Cart
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="info"
                  startIcon={<Lock />}
                  onClick={() => setPasswordModalOpen(true)}
                >
                  Update Password
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Logout />}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ borderRadius: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="profile tabs"
        >
          <Tab label="Order History" />
          <Tab label="Addresses" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <OrderHistory orders={orders} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <AddressManager
            addresses={addresses}
            onAddAddress={handleAddAddress}
            onUpdateAddress={handleUpdateAddress}
            onDeleteAddress={handleDeleteAddress}
          />
        </TabPanel>
      </Paper>

      <Dialog
        open={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Update Password</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Current Password"
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      edge="end"
                    >
                      {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
            />

            <TextField
              fullWidth
              margin="normal"
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              helperText="Must be at least 8 characters long."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
            />

            <TextField
              fullWidth
              margin="normal"
              label="Confirm New Password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ pb: 3, px: 3 }}>
          <Button onClick={() => setPasswordModalOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleUpdatePassword}
            disabled={isLoading}
            sx={{ bgcolor: "#9b87f5", "&:hover": { bgcolor: "#7E69AB" } }}
          >
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
