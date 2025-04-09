import React, { useState } from "react";
import { CartItem } from "../../types/type";
import OrderItemCard from "./OrderItemCard";
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
} from "@mui/material";

interface OrderSummaryProps {
  cart: CartItem[];
  isAddressSelected: boolean;
  onCheckout: (order: any) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cart,
  isAddressSelected,
  onCheckout,
}) => {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal =
    cart &&
    cart.reduce((sum, item) => sum + item.meal.price * item.quantity, 0);
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

  const handleCheckout = () => {
    const order = {
      subTotal: subtotal,
      discount: discount,
      total: total,
      deliveryCharges: deliveryCharges,
      items:
        cart &&
        cart.map((item) => ({
          itemName: item.meal.title,
          quantity: item.quantity,
          price: item.meal.price,
          itemTotal: item.meal.price * item.quantity,
        })),
    };
    onCheckout(order);
  };

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
        {cart.map((item) => (
          <OrderItemCard key={item.id} item={item} />
        ))}
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" fontWeight={500} sx={{ mb: 1 }}>
          Have a coupon?
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
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
              bgcolor: couponApplied ? "#A5D6A7" : "#FFA500",
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

      <Box sx={{ borderTop: "1px solid #E0E0E0", pt: 2, pb: 2 }}>
        <Stack spacing={2} sx={{ mb: 2 }}>
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
