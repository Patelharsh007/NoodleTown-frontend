import React from "react";
import { User } from "../../types/type";
import { ShoppingCart, LogOut, Lock, Camera } from "lucide-react";
import { Button, Box, Typography, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

interface ProfileHeaderProps {
  user: User;
  onUpdateProfileImage: (file: File) => void;
  onLogout: () => void;
  onPasswordUpdate: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  onUpdateProfileImage,
  onLogout,
  onPasswordUpdate,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpdateProfileImage(e.target.files[0]);
    }
  };

  const getInitials = () => {
    if (user.userName) {
      return user.userName.substring(0, 2).toUpperCase();
    }
    return user.email.substring(0, 2).toUpperCase();
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
        <Avatar
          src={user.profileImage || undefined}
          alt={user.userName || user.email}
          sx={{
            width: 96,
            height: 96,
            fontSize: "2rem",
            bgcolor: "primary.light",
            color: "primary.contrastText",
            // border: "2px solid #FFA500",
            border: "2px solid #333333",
          }}
        >
          {getInitials()}
        </Avatar>

        {/* User info and buttons */}
        <Box sx={{ flexGrow: 1, textAlign: { xs: "center", md: "left" } }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            {user.userName || "Hello there!"}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
            {user.email}
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
              startIcon={<Camera size={16} />}
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
              Update Profile
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
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
              onClick={onLogout}
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
