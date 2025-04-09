import { useState } from "react";
import {
  Button,
  Input,
  FormControl,
  InputLabel,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../../components/ToastContainer";

interface UpdatePasswordProps {
  onUpdatePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
}

const UpdatePassword = ({ onUpdatePassword }: UpdatePasswordProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      showInfoToast("New password and confirmation password must match.");
      return;
    }

    if (newPassword.length < 8) {
      showInfoToast("Password must be at least 8 characters long.");
      return;
    }

    try {
      setIsLoading(true);
      await onUpdatePassword(currentPassword, newPassword);
      showSuccessToast("Your password has been updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      showErrorToast("Failed to update password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 3,
        padding: 3,
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Update Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="currentPassword">Current Password</InputLabel>
          <Box sx={{ position: "relative" }}>
            <Input
              id="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              required
              endAdornment={
                <IconButton
                  sx={{
                    position: "absolute",
                    right: 1,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </IconButton>
              }
            />
          </Box>
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="newPassword">New Password</InputLabel>
          <Box sx={{ position: "relative" }}>
            <Input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
              endAdornment={
                <IconButton
                  sx={{
                    position: "absolute",
                    right: 1,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </IconButton>
              }
            />
          </Box>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginTop: 1 }}
          >
            Must be at least 8 characters long.
          </Typography>
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="confirmPassword">
            Confirm New Password
          </InputLabel>
          <Box sx={{ position: "relative" }}>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              endAdornment={
                <IconButton
                  sx={{
                    position: "absolute",
                    right: 1,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </IconButton>
              }
            />
          </Box>
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={isLoading}
          sx={{ marginTop: 2 }}
        >
          {isLoading ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </Box>
  );
};

export default UpdatePassword;
