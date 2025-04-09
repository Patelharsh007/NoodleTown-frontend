import { useState } from "react";
import { Avatar, Button, IconButton, Box, Typography } from "@mui/material";
import { Camera, LogOut, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { User } from "../../types/type";

interface ProfileHeaderProps {
  user: User;
  onUpdateProfileImage: (file: File) => void;
  onLogout: () => void;
}

const ProfileHeader = ({
  user,
  onUpdateProfileImage,
  onLogout,
}: ProfileHeaderProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpdateProfileImage(e.target.files[0]);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 3,
        p: 3,
        mb: 6,
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
        <Box
          sx={{
            position: "relative",
            "&:hover .avatar-overlay": {
              opacity: 1,
            },
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Avatar sx={{ width: 96, height: 96, border: "2px solid #f7c3c3" }}>
            <img
              src={user.profileImage || undefined}
              alt={user.userName || user.email}
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
            {!user.profileImage && (
              <Typography
                sx={{
                  backgroundColor: "#f7c3c3",
                  color: "#f08080",
                  fontSize: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {(user.userName || user.email).substring(0, 2).toUpperCase()}
              </Typography>
            )}
          </Avatar>

          <Box
            className="avatar-overlay"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0,
              borderRadius: "50%",
              transition: "opacity 0.3s",
            }}
          >
            <label htmlFor="avatar-upload" style={{ cursor: "pointer" }}>
              <Camera style={{ color: "white" }} />
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
        </Box>

        <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
          <Typography variant="h6" sx={{ mb: 1, color: "text.primary" }}>
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
              variant="outlined"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
              component={Link}
              to="/cart"
            >
              <ShoppingCart width={16} height={16} />
              My Cart
            </Button>
            <Button
              variant="outlined"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "error.main",
                borderColor: "error.main",
                "&:hover": {
                  backgroundColor: "error.main",
                  color: "white",
                },
              }}
              onClick={onLogout}
            >
              <LogOut style={{ width: 16, height: 16 }} />
              Logout
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
