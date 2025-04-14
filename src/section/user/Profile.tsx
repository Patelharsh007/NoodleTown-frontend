import React, { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import OrderHistoryList from "./OrderHistory";
import AddressManager from "./AddressManager";
import UpdatePasswordModal from "./UpdatePassword";
import { Tabs, Tab, Box } from "@mui/material";
import {
  showSuccessToast,
  showErrorToast,
} from "../../components/ToastContainer";
import { updateProfileImage } from "../../util/util";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/AuthUserSlice";
import useCart from "../../hooks/useCartMeal";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserProfile: React.FC = () => {
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("addresses");
  const [isUpdatingImage, setIsUpdatingImage] = useState(false);
  const dispatch = useDispatch();
  const { emptyCart } = useCart();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get("tab");
    if (tab === "addresses" || tab === "orders") {
      setActiveTab(tab);
    }
  }, [location.search]);

  const handleTabChange = (e: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
    navigate(`?tab=${newValue}`);
  };

  const handleUpdateProfileImage = async (file: File) => {
    try {
      setIsUpdatingImage(true);
      const response = await updateProfileImage(file);

      if (response) {
        dispatch(setUser(response.user));
        showSuccessToast("Profile picture updated successfully");
      }
    } catch (error) {
      showErrorToast(
        error instanceof Error
          ? error.message
          : "Failed to update profile picture"
      );
    } finally {
      setIsUpdatingImage(false);
    }
  };

  const handleOrderSuccess = async () => {
    try {
      await emptyCart();
      // dispatch(clearCart());
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: 4 }}>
      <Box sx={{ marginBottom: 4 }}>
        <ProfileHeader
          onUpdateProfileImage={handleUpdateProfileImage}
          onPasswordUpdate={() => setPasswordDialogOpen(true)}
          isUpdatingImage={isUpdatingImage}
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
          <Tab label="Your Addresses" value="addresses" />
          <Tab label="Order History" value="orders" />
        </Tabs>

        <Box sx={{ padding: 1 }}>
          {activeTab === "addresses" && <AddressManager />}
          {activeTab === "orders" && <OrderHistoryList orders={[]} />}
        </Box>
      </Box>

      <UpdatePasswordModal
        open={passwordDialogOpen}
        onClose={() => setPasswordDialogOpen(false)}
      />
    </Box>
  );
};

export default UserProfile;
