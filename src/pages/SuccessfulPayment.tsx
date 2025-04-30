import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { CheckCircle2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../components/ToastContainer";
import axios from "axios";

const SuccessfulPayment: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) return;

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKENDURL}/order/verifyPayment?session_id=${sessionId}`,
          { withCredentials: true }
        );
        showSuccessToast("Payment successful!");
        console.log("Verified Order:", res.data);
      } catch (error) {
        console.error("Payment verification failed:", error);
        showErrorToast("Payment verification failed. Please contact support.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

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
          Your order has been placed successfully. We will send you a
          confirmation email shortly.
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
            onClick={() => navigate("/user?tab=orders")}
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
