import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { LoginForm } from "../../form/LoginForm";
import { assets } from "../../assets/assets";
import { showErrorToast, showInfoToast } from "../../components/ToastContainer";
import { setUser } from "../../redux/slices/AuthUserSlice";
import { RootState } from "../../redux/Store";

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const authUser = useSelector((state: RootState) => state.authUser.authUser);

  if (authUser.isAuthenticated) {
    return <Navigate to="/user" />;
  }

  const handleLogin = async (email: string, password: string) => {
    const loginInfo = {
      email: email,
      password: password,
    };

    setLoading(true);
    try {
      const url = "http://localhost:8080/api/auth/login";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
        credentials: "include",
      });

      const result = await response.json();

      if (result.status === "success") {
        showInfoToast(`${result.message}`);
        const id = result.logUser.id as number;
        const userName = result.logUser.userName as string;
        dispatch(setUser({ id, userName, email }));
        navigate("/user");
      } else if (result.status === "error") {
        // Handle validation errors
        if (result.errors && result.errors.length > 0) {
          result.errors.forEach((error: { field: string; message: string }) => {
            // Display error messages for each field
            showErrorToast(`${error.message}`);
          });
        } else {
          showErrorToast(`${result.message}`);
        }
      }
    } catch (error) {
      console.log("Error during fetch:", error);
      showErrorToast("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      width="100%"
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        minHeight: "100vh",
        backgroundImage: {
          xs: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${assets.images.auth.authBg})`,
          md: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${assets.images.auth.authBg1})`,
        },
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        width={{ xs: "70%", sm: "50%" }}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "24px",
          padding: { xs: 3, sm: 4 },
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          textAlign: "center",
        }}
      >
        <Box
          component="img"
          src={assets.images.auth.authLogo}
          alt="Noodletown"
          sx={{
            width: "80px",
            height: "80px",
            display: "block",
            margin: "0 auto 20px",
          }}
        />

        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: "#333",
            mb: 1,
            fontSize: { xs: "1.5rem", sm: "2rem" },
          }}
        >
          Welcome Back!
        </Typography>

        <Typography
          sx={{
            color: "#666",
            mb: 3,
            fontSize: "0.9rem",
          }}
        >
          Your favorite food is waiting for you!
        </Typography>

        <LoginForm
          onSubmit={handleLogin}
          loading={loading}
          setLoading={setLoading}
        />

        <Typography
          onClick={() => navigate("/auth/register")}
          sx={{
            color: "#FFA500",
            textTransform: "none",
            fontWeight: "bold",
            mt: 2,
            mb: 2,
            display: "block",
            width: "100%",
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#ff8c00",
              cursor: "pointer",
            },
          }}
        >
          Create Account
        </Typography>

        <Link
          to="/home"
          style={{
            display: "block",
            textAlign: "center",
            color: "#666",
            fontSize: "0.9rem",
            marginTop: "1rem",
            textDecoration: "none",
          }}
        >
          Go to HomePage
        </Link>
      </Box>
    </Box>
  );
};

export default Login;
