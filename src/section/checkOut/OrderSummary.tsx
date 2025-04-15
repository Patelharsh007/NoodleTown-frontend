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
} from "@mui/material";
import useCart from "../../hooks/useCartMeal";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { createPayment } from "../../util/util";
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

  const stripePromise = loadStripe(
    "pk_test_51RCJqwDfRsZ5MFTOWEumZBCfll3VQvDmpMmD2oSXKIge7louCqiymjHYh1Zgdy5SuR9X0m7CTfN6z7Zd54QhmL5y00sZy30aD8"
  );

  const navigate = useNavigate();

  const { cart, isLoadingCart: isLoading, errorCart: error } = useCart();

  const subtotal: number =
    cart?.reduce(
      (sum: number, item: CartItem) => sum + item.meal.price * item.quantity,
      0
    ) || 0;
  const deliveryCharges = 40;
  const total = subtotal - discount + deliveryCharges;

  const handleApplyCoupon = () => {
    if (
      couponCode.toLowerCase() === "first50" ||
      couponCode.toUpperCase() === "FIRST50"
    ) {
      setDiscount(50);
      setCouponApplied(true);
      showSuccessToast("Coupon applied: ₹50 off");
    } else if (couponCode) {
      showErrorToast("Invalid coupon code");
      setDiscount(0);
      setCouponApplied(false);
    }
  };

  const handleCheckout = async () => {
    if (!cart || !authUser || !selectedAddressId) return;

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

      // Redirect user to payment page or success page
      navigate("/payment-success");
      showSuccessToast("Payment created successfully!");
    } catch (error: any) {
      showErrorToast(error.message || "Failed to create payment");
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
        <Typography variant="body1" fontWeight={500} sx={{ mb: 1 }}>
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
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Check style={{ fontSize: 16, marginRight: 1 }} />
                Applied
              </Box>
            ) : (
              "Apply"
            )}
          </Button>
        </Stack>
        {couponApplied && (
          <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
            Coupon FIRST50 applied: ₹50 off
          </Typography>
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
        disabled={!isAddressSelected || cart.length === 0}
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
