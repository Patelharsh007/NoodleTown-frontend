import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, OrderItem, AddressItem } from "../../types/type";
import ProfileHeader from "./ProfileHeader";
import OrderHistoryList from "./OrderHistory";
import AddressManager from "./AddressManager";
import UpdatePasswordModal from "./UpdatePassword";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { showSuccessToast } from "../../components/ToastContainer";

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
    street: "123 Main St",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    country: "India",
  },
  {
    id: "2",
    street: "456 Park Ave",
    city: "Delhi",
    state: "Delhi",
    pincode: "110001",
    country: "India",
  },
];

const sampleOrders: OrderItem[] = [
  {
    id: 1001,
    status: "completed",
    user_email: "john.doe@example.com",
    orderedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    subTotal: 850,
    discount: 50,
    total: 800,
    deliveryCharges: 100,
    address: {
      id: "1",
      street: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      country: "India",
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
    user_email: "john.doe@example.com",
    status: "pending",
    orderedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    subTotal: 400,
    discount: 0,
    total: 400,
    deliveryCharges: 150,

    address: {
      id: "2",
      street: "456 Park Avenue",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
      country: "India",
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
];

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User>(sampleUser);
  const [orders, setOrders] = useState<OrderItem[]>(sampleOrders);
  const [addresses, setAddresses] = useState<AddressItem[]>(sampleAddresses);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("orders"); // State to track active tab
  const navigate = useNavigate();

  const handleUpdateProfileImage = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser({
        ...user,
        profileImage: reader.result as string,
      });
      showSuccessToast("Profile picture updated successfully");
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    showSuccessToast("You have been logged out successfully");
    navigate("/");
  };

  const handleUpdatePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Password updated:", { currentPassword, newPassword });
        resolve();
      }, 1000);
    });
  };

  const handleAddAddress = async (address: Omit<AddressItem, "id">) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newAddress = { id: `addr-${Date.now()}`, ...address };
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
    <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: 4 }}>
      <Box sx={{ marginBottom: 4 }}>
        <ProfileHeader
          user={user}
          onUpdateProfileImage={handleUpdateProfileImage}
          onLogout={handleLogout}
          onPasswordUpdate={() => setPasswordDialogOpen(true)}
        />
      </Box>

      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
          padding: 2,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tab label="Order History" value="orders" />
          <Tab label="Your Addresses" value="addresses" />
        </Tabs>

        <Box sx={{ padding: 1 }}>
          {activeTab === "orders" && <OrderHistoryList orders={orders} />}
          {activeTab === "addresses" && (
            <AddressManager
              addresses={addresses}
              onAddAddress={handleAddAddress}
              onUpdateAddress={handleUpdateAddress}
              onDeleteAddress={handleDeleteAddress}
            />
          )}
        </Box>
      </Box>

      <UpdatePasswordModal
        open={passwordDialogOpen}
        onClose={() => setPasswordDialogOpen(false)}
        onUpdatePassword={handleUpdatePassword}
      />
    </Box>
  );
};

export default UserProfile;
