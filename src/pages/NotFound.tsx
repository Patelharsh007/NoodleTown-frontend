import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { assets } from "../assets/assets";

const NotFound = () => {
  return (
    <Box
      maxWidth={"100%"}
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
        textAlign: "center",
      }}
    >
      {/* Title */}
      <Typography
        variant="h3"
        sx={{ color: "#FFC300", fontWeight: "bold", marginBottom: 2 }}
      >
        Oops! Page Not Found
      </Typography>

      {/* Subtitle */}
      <Typography variant="h6" sx={{ color: "#333", marginBottom: 3 }}>
        We couldn't find the page you were looking for.
      </Typography>

      {/* Illustration */}
      <Box
        component={"img"}
        src={`${assets.images.auth.authLogo}`}
        alt={"404 Illustration"}
        height={"100px"}
        marginBottom={3}
      />

      <Button
        component={Link}
        to="/home"
        variant="contained"
        sx={{
          backgroundColor: "#FFC300",
          color: "white",
          borderRadius: "30px",
          padding: "10px 30px",
          fontSize: "16px",
          "&:hover": {
            backgroundColor: "#FFA500",
          },
        }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default NotFound;
