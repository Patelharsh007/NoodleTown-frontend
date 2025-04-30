import React, { useState } from "react";
import { CartItem } from "../../types/type";
import OrderItemCardCheckOut from "../../components/OrderItemCardCheckOut";
import { Check, ShoppingBag } from "lucide-react";
import {
  showSuccessToast,
  showErrorToast,
  showInfoToast,
} from "../../components/ToastContainer";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Stack,
  Divider,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import useCart from "../../hooks/useCartMeal";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { createPayment, getCoupon } from "../../util/util";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

interface OrderSummaryProps {
  isAddressSelected: boolean;
  selectedAddressId: string | null;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  isAddressSelected,
  selectedAddressId,
}) => {
  const authUser = useSelector((state: RootState) => state.authUser.authUser);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const stripePromise = loadStripe(
    "pk_test_51RCJr7D6zlgEmt95BvNKtdWDlLAoPV0MhIgcnodjWPYQkaYZbNfBKQF4kTiR3ckrlK5iKcyxfptlOth1pE0RU3Dq00Trzxo8jB"
  );

  const navigate = useNavigate();

  const { cart, isLoadingCart: isLoading, errorCart: error } = useCart();

  const subtotal: number =
    cart?.reduce(
      (sum: number, item: CartItem) => sum + item.meal?.price! * item.quantity,
      0
    ) || 0;
  const deliveryCharges = 40;
  const total = subtotal - discount + deliveryCharges;

  const handleApplyCoupon = async () => {
    try {
      const coupon = await getCoupon(couponCode.toUpperCase());

      if (coupon) {
        if (coupon.amount > subtotal) {
          showErrorToast("Order more to use this coupon.");
          setDiscount(0);
          setCouponApplied(false);
          return;
        }
        setDiscount(coupon.amount);
        setCouponCode(coupon.coupon_code);
        setCouponApplied(true);
        showSuccessToast(`Coupon applied: ₹${coupon.amount} off`);
      } else {
        showErrorToast("Invalid coupon code");
        setDiscount(0);
        setCouponApplied(false);
      }
    } catch (error) {
      showErrorToast(
        error instanceof Error
          ? error.message
          : "An error occurred while applying the coupon."
      );
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setDiscount(0);
    setCouponApplied(false);
  };

  const handleCheckout = async () => {
    if (!cart || !authUser || !selectedAddressId) return;

    setIsPaying(true);
    try {
      const paymentData = await createPayment(discount, selectedAddressId);
      console.log("Payment created successfully", paymentData);

      const stripe = await stripePromise;
      if (!stripe) {
        showErrorToast("Stripe initialization failed. Please try again.");
        return;
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: paymentData.session,
      });

      if (error) {
        showErrorToast("Payment failed: " + error.message);
      }

      navigate("/payment-success");
      showSuccessToast("Payment created successfully!");
    } catch (error) {
      showErrorToast(
        error instanceof Error
          ? error.message
          : "An error occurred while creating payment"
      );
    } finally {
      setIsPaying(false);
    }
  };

  if (isLoading) {
    return (
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 1 }}>
        <Skeleton variant="text" width="60%" height={40} sx={{ mb: 2 }} />
        <Stack spacing={2}>
          {[1, 2, 3].map((i) => (
            <Box key={i} sx={{ display: "flex", gap: 2 }}>
              <Skeleton variant="rectangular" width={64} height={64} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="60%" />
              </Box>
            </Box>
          ))}
        </Stack>
        <Skeleton variant="text" width="100%" height={40} sx={{ mt: 3 }} />
        <Skeleton variant="text" width="100%" height={40} sx={{ mt: 1 }} />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 1 }}>
        <Typography color="error" variant="body1">
          Error loading cart items. Please try again later.
        </Typography>
      </Paper>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 1 }}>
        <Typography
          variant="h6"
          gutterBottom
          display="flex"
          alignItems="center"
        >
          <ShoppingBag style={{ marginRight: "8px", color: "#FFA500" }} />
          Order Summary
        </Typography>
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            Your cart is empty
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h6" gutterBottom display="flex" alignItems="center">
        <ShoppingBag style={{ marginRight: "8px", color: "#FFA500" }} />
        Order Summary
        <Box
          sx={{
            ml: "auto",
            bgcolor: "#FFF4E5",
            color: "#FFA500",
            borderRadius: "12px",
            px: 2,
            py: 0.5,
            fontSize: "0.875rem",
          }}
        >
          {cart.length} {cart.length === 1 ? "item" : "items"}
        </Box>
      </Typography>

      <Box sx={{ maxHeight: "300px", overflowY: "auto", pr: 1, mb: 2 }}>
        {cart.map((item: CartItem) => (
          <OrderItemCardCheckOut key={item.id} item={item} />
        ))}
      </Box>

      <Box>
        <Typography
          variant="body1"
          fontWeight={500}
          padding={"7px"}
          sx={{ mb: 1 }}
        >
          Have a coupon?
        </Typography>

        <Stack direction="row" spacing={2}>
          <TextField
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder="Enter coupon code"
            variant="outlined"
            fullWidth
            disabled={couponApplied}
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderColor: couponApplied ? "#A5D6A7" : "#E0E0E0",
              },
            }}
          />
          <Button
            onClick={handleApplyCoupon}
            disabled={!couponCode || couponApplied}
            variant="contained"
            sx={{
              bgcolor: couponApplied ? "#7DDA58" : "#FFA500",
              "&:hover": {
                bgcolor: couponApplied ? "#81C784" : "#FF8F00",
              },
            }}
          >
            {couponApplied ? (
              <Box
                sx={{ display: "flex", alignItems: "center", padding: "2px" }}
              >
                <Check style={{ fontSize: 16, marginRight: 1 }} />
                Applied
              </Box>
            ) : (
              "Apply"
            )}
          </Button>
        </Stack>
        {couponApplied && (
          <Stack
            direction="row"
            spacing={2}
            justifyContent={"space-between"}
            alignItems={"center"}
            marginTop={"7px"}
          >
            <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
              Coupon {couponCode} applied: ₹{discount} off
            </Typography>
            <Button
              size="small"
              variant="contained"
              disabled={!couponApplied}
              sx={{
                padding: "7px",
                width: "100px",
                bgcolor: "#EF5350",
                color: "#FFFFFF",
                "&:hover": {
                  bgcolor: "#D32F2F",
                },
              }}
              onClick={handleRemoveCoupon}
            >
              Remove
            </Button>
          </Stack>
        )}
      </Box>

      <Box>
        <Stack spacing={2} sx={{ mb: 2 }} marginTop={"20px"}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="textSecondary">
              Subtotal
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              ₹{subtotal.toFixed(2)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="textSecondary">
              Delivery Fee
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              ₹{deliveryCharges.toFixed(2)}
            </Typography>
          </Box>
          {discount > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                color: "success.main",
              }}
            >
              <Typography variant="body2">Discount</Typography>
              <Typography variant="body2">-₹{discount.toFixed(2)}</Typography>
            </Box>
          )}
        </Stack>

        <Divider sx={{ borderColor: "#E0E0E0", mb: 2 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: 600,
          }}
        >
          <Typography variant="body1">Total</Typography>
          <Typography variant="body1" sx={{ color: "#FFA500" }}>
            ₹{total.toFixed(2)}
          </Typography>
        </Box>
      </Box>

      <Button
        onClick={handleCheckout}
        disabled={
          isPaying || isLoading || !isAddressSelected || cart.length === 0
        }
        variant="contained"
        fullWidth
        sx={{
          bgcolor: "#FFA500",
          "&:hover": { bgcolor: "#FF8F00" },
          py: 2,
          mt: 2,
          fontSize: "1rem",
          fontWeight: 600,
          textTransform: "none",
          disabled: {
            bgcolor: "#BDBDBD",
            cursor: "not-allowed",
          },
        }}
        startIcon={
          isPaying ? (
            <CircularProgress size={20} sx={{ color: "white" }} />
          ) : null
        }
      >
        {!isAddressSelected
          ? "Select an address to continue"
          : cart.length === 0
          ? "Add items to cart"
          : `Place Order • ₹${total.toFixed(2)}`}
      </Button>
    </Paper>
  );
};

export default OrderSummary;
