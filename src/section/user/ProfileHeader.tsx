import React, { useState } from "react";
import { User } from "../../types/type";
import { Camera, ShoppingCart, LogOut, Lock } from "lucide-react";
import { Button, Box, Typography, IconButton, Tooltip } from "@mui/material";
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
  const [isHovering, setIsHovering] = useState(false);

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
        {/* Avatar with upload overlay */}
        <Box
          sx={{
            position: "relative",
            width: 96,
            height: 96,
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid #FFA500", // orange-200
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FFF4E0", // orange-50
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.userName || user.email}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Typography
              variant="h5"
              sx={{ color: "#FFA500", fontWeight: "bold" }}
            >
              {getInitials()}
            </Typography>
          )}

          <label
            htmlFor="avatar-upload"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "50%",
              cursor: "pointer",
              opacity: isHovering ? 1 : 0,
              transition: "opacity 0.2s",
            }}
          >
            <Camera style={{ color: "white" }} size={24} />
            <span className="sr-only">Update profile picture</span>
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </Box>

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
              startIcon={<ShoppingCart size={16} />}
              sx={{ gap: 1 }}
            >
              My Cart
            </Button>

            <Button
              variant="outlined"
              startIcon={<Lock size={16} />}
              onClick={onPasswordUpdate}
              sx={{ gap: 1 }}
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
                borderColor: "red.200",
                "&:hover": {
                  backgroundColor: "red.50",
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
