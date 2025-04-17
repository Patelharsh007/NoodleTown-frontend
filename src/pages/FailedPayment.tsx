import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FailedPayment: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 500,
          width: "100%",
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <XCircle
            size={64}
            color="#FFA500"
            style={{ strokeWidth: 1.5 }}
          />
        </Box>

        <Typography variant="h4" fontWeight={600} gutterBottom color="#FFA500">
          Payment Failed
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          We couldn't process your payment. Please try again or use a different payment method.
        </Typography>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="outlined"
            color="warning"
            onClick={() => navigate("/")}
            sx={{ px: 4 }}
          >
            Back to Home
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => navigate("/checkout")}
            sx={{ px: 4 }}
          >
            Try Again
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default FailedPayment; 