import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SuccessfulPayment: React.FC = () => {
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
          <CheckCircle2
            size={64}
            color="#FFA500"
            style={{ strokeWidth: 1.5 }}
          />
        </Box>

        <Typography variant="h4" fontWeight={600} gutterBottom color="#FFA500">
          Payment Successful!
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Your order has been placed successfully. We will send you a confirmation
          email shortly.
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
            onClick={() => navigate("/orders")}
            sx={{ px: 4 }}
          >
            View Orders
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SuccessfulPayment; 