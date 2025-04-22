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
    return "U";
  };

  const handleLogout = async () => {
    try {
      await logout();
      queryClient.removeQueries({ queryKey: ["cartItems", userData.id] });
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
              size={100}
              sx={{
                color: "#FFA500",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
              }}
            />
          )}
          {!isUpdatingImage && (
            <Button
              component="label"
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                minWidth: 0,
                padding: 0.5,
                backgroundColor: "#FFF4E0",
                borderRadius: "50%",
                "&:hover": {
                  backgroundColor: "#FFE4B5",
                },
              }}
            >
              <Camera size={16} color="#FFA500" />
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </Button>
          )}
        </Box>

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
