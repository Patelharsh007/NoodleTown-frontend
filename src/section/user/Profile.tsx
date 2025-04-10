import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, OrderItem, AddressItem } from "../../types/type";
import ProfileHeader from "./ProfileHeader";
import OrderHistoryList from "./OrderHistory";
import AddressManager from "./AddressManager";
import UpdatePasswordModal from "./UpdatePassword";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { showSuccessToast } from "../../components/ToastContainer";
import { useDispatch, useSelector } from "react-redux";

import { clearUser } from "../../redux/slices/AuthUserSlice";

const UserProfile: React.FC = () => {
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("orders");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUpdateProfileImage = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      showSuccessToast("Profile picture updated successfully");
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    dispatch(clearUser());
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

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: 4 }}>
      <Box sx={{ marginBottom: 4 }}>
        <ProfileHeader
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
            "& .MuiTab-root": {
              color: "text.secondary",
              "&.Mui-selected": {
                color: "#FFA500",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#FFA500",
            },
          }}
        >
          <Tab label="Order History" value="orders" />
          <Tab label="Your Addresses" value="addresses" />
        </Tabs>

        <Box sx={{ padding: 1 }}>
          {activeTab === "orders" && <OrderHistoryList orders={[]} />}
          {activeTab === "addresses" && <AddressManager />}
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
