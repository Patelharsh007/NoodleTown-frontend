import React, { useState } from "react";
import {
  Stack,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  loading: boolean; // Prop for loading state
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormData {
  email: string;
  password: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  loading,
  setLoading,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  // const validateForm = () => {
  //   const newErrors: Partial<FormData> = {};

  //   if (!formData.email) {
  //     newErrors.email = "Email is required";
  //   } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
  //     newErrors.email = "Invalid email format";
  //   }

  //   if (!formData.password) {
  //     newErrors.password = "Password is required";
  //   } else if (formData.password.length < 6) {
  //     newErrors.password = "Password must be at least 6 characters";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData.email, formData.password);
  };

  return (
    <Stack spacing={3}>
      <TextField
        fullWidth
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email sx={{ color: "#FFA500" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            "& fieldset": {
              borderColor: "rgba(0, 0, 0, 0.1)",
            },
            "&:hover fieldset": {
              borderColor: "#FFA500",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FFA500",
            },
          },
        }}
      />
      <TextField
        fullWidth
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock sx={{ color: "#FFA500" }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                size="small"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            "& fieldset": {
              borderColor: "rgba(0, 0, 0, 0.1)",
            },
            "&:hover fieldset": {
              borderColor: "#FFA500",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FFA500",
            },
          },
        }}
      />
      <Button
        onClick={handleSubmit}
        disabled={loading}
        variant="contained"
        size="large"
        sx={{
          bgcolor: "#FFA500",
          color: "#fff",
          fontFamily: "Poppins",
          fontSize: "1rem",
          py: 1.5,
          borderRadius: "12px",
          textTransform: "none",
          transition: "all 0.3s ease",
          "&:hover": {
            bgcolor: "#ff8c00",
            transform: "translateY(-2px)",
            boxShadow: "0 5px 15px rgba(255, 165, 0, 0.4)",
          },
        }}
      >
        {loading ? (
          <CircularProgress size={24} sx={{ color: "#fff" }} />
        ) : (
          "Login"
        )}
      </Button>
    </Stack>
  );
};
