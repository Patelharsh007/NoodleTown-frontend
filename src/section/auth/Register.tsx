import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { SignUpForm } from "../../form/SignUpForm";
import { assets } from "../../assets/assets";
import { showErrorToast, showInfoToast } from "../../components/ToastContainer";
import { RootState } from "../../redux/Store";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const authUser = useSelector((state: RootState) => state.authUser.authUser);

  if (authUser.isAuthenticated) {
    return <Navigate to="/user" />;
  }

  const handleSignUp = async (
    fullName: string,
    email: string,
    password: string
  ) => {
    const signUpInfo = {
      userName: fullName,
      email: email,
      password: password,
    };
    setLoading(true);

    try {
      const url = "http://localhost:8080/api/auth/register";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpInfo),
      });

      const result = await response.json();

      if (result.status === "success") {
        showInfoToast(`${result.message}`);
        // dispatch(signUp({ email, password }));
        navigate("/auth/login");
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
          Create Account
        </Typography>

        <Typography
          sx={{
            color: "#666",
            mb: 3,
            fontSize: "0.9rem",
          }}
        >
          Join us for delicious adventures!
        </Typography>

        <SignUpForm
          onSubmit={handleSignUp}
          loading={loading}
          setLoading={setLoading}
        />

        <Typography
          onClick={() => navigate("/auth/login")}
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
          Login
        </Typography>
        {/* </Button> */}

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

export default Register;
