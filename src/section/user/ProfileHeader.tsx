import React from "react";
import { ShoppingCart, LogOut, Lock, Camera } from "lucide-react";
import {
  Button,
  Box,
  Typography,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/Store";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/slices/AuthUserSlice";
import { logout } from "../../util/util";
import { useQueryClient } from "@tanstack/react-query";
import { showSuccessToast } from "../../components/ToastContainer";

interface ProfileHeaderProps {
  onUpdateProfileImage: (file: File) => void;
  onPasswordUpdate: () => void;
  isUpdatingImage: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  onUpdateProfileImage,
  onPasswordUpdate,
  isUpdatingImage,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const userData = useSelector((state: RootState) => state.authUser.authUser);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpdateProfileImage(e.target.files[0]);
    }
  };

  const getInitials = () => {
    if (userData?.userName) {
      return userData.userName.substring(0, 2).toUpperCase();
    }
    if (userData?.email) {
      return userData.email.substring(0, 2).toUpperCase();
    }
    return "U"; // Default initial if both are undefined
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Clear cart query data
      queryClient.removeQueries({ queryKey: ["cartItems", userData.id] });
      // Clear user data from Redux
      dispatch(clearUser());
      showSuccessToast("You have been logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      showSuccessToast("Failed to logout. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 3,
        p: 3,
        mb: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 3,
        }}
      >
        {/* Avatar */}
        <Box sx={{ position: "relative" }}>
          <Avatar
            src={userData.profileImage || undefined}
            alt={userData.userName || userData.email}
            sx={{
              width: 96,
              height: 96,
              fontSize: "2rem",
              bgcolor: "primary.light",
              color: "primary.contrastText",
              border: "2px solid #333333",
              opacity: isUpdatingImage ? 0.5 : 1,
            }}
          >
            {getInitials()}
          </Avatar>
          {isUpdatingImage && (
            <CircularProgress
              size={96}
              sx={{
                color: "#FFA500",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
              }}
            />
          )}
        </Box>

        {/* User info and buttons */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            {userData.userName || "Hello there!"}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
            {userData.email}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <Button
              component={Link}
              to="/cart"
              variant="outlined"
              sx={{
                gap: 1,
                color: "#FFA500",
                backgroundColor: "#FFF4E0",
                borderColor: "#FFA500",
                "&:hover": {
                  backgroundColor: "#FFE4B5",
                },
              }}
              startIcon={<ShoppingCart size={16} />}
            >
              My Cart
            </Button>

            <Button
              component="label"
              variant="outlined"
              startIcon={
                isUpdatingImage ? (
                  <CircularProgress size={16} />
                ) : (
                  <Camera size={16} />
                )
              }
              disabled={isUpdatingImage}
              sx={{
                gap: 1,
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
              {isUpdatingImage ? "Updating..." : "Update Profile"}
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
                disabled={isUpdatingImage}
              />
            </Button>

            <Button
              variant="outlined"
              startIcon={<Lock size={16} />}
              onClick={onPasswordUpdate}
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
              Update Password
            </Button>

            <Button
              variant="outlined"
              startIcon={<LogOut size={16} />}
              onClick={handleLogout}
              sx={{
                gap: 1,
                color: "red",
                borderColor: "red",
                backgroundColor: "#f6c1c1",
                "&:hover": {
                  backgroundColor: "#f8a0a0",
                  color: "red.600",
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
