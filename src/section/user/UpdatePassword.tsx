import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  showErrorToast,
  showSuccessToast,
} from "../../components/ToastContainer";
import { updatePassword } from "../../util/util";

interface UpdatePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

const UpdatePasswordModal: React.FC<UpdatePasswordModalProps> = ({
  open,
  onClose,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      showErrorToast("New password and confirmation don't match");
      return;
    }

    if (newPassword.length < 6) {
      showErrorToast("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    try {
      await updatePassword({
        currentPassword,
        newPassword,
        confirmNew: confirmPassword,
      });
      showSuccessToast("Password updated successfully");
      handleClose();
    } catch (error: any) {
      showErrorToast(error.message || "Failed to update password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 600,
          borderBottom: 1,
          borderColor: "divider",
          pb: 2,
          color: "#FFA500",
        }}
      >
        Update Password
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            fullWidth
            label="Current Password"
            type={showCurrentPassword ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    edge="end"
                  >
                    {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#FFA500",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#FFA500",
              },
            }}
            required
          />

          <TextField
            fullWidth
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            helperText="Must be at least 6 characters long."
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
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#FFA500",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#FFA500",
              },
            }}
            required
          />

          <TextField
            fullWidth
            label="Confirm New Password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#FFA500",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#FFA500",
              },
            }}
            required
          />
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          p: 3,
          borderTop: 1,
          borderColor: "divider",
        }}
      >
        <Button
          onClick={handleClose}
          disabled={isLoading}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 3,
            color: "#666",
            "&:hover": {
              backgroundColor: "#FFF4E0",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          onClick={handleSubmit}
          disabled={isLoading}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 3,
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
          {isLoading ? (
            <CircularProgress size={24} sx={{ color: "#FFA500" }} />
          ) : (
            "Update Password"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdatePasswordModal;
