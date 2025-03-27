import {
  Grid2,
  Typography,
  Stack,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { clearCart } from "../redux/slices/CartSlice";
import { showSuccessToast } from "../components/ToastContainer";
import { placeOrder } from "../redux/slices/OrderSlice";
import { deselectAddress } from "../redux/slices/SelectedAddressSlice";
import { useNavigate } from "react-router-dom";
import { OrderItem } from "../types/type";

const OrderSummaryForm = () => {
  // Checkout--- totaldiscount etc
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Redux
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const selectedAddress = useSelector(
    (state: RootState) => state.seletedAddress.item
  );

  const { authUser } = useSelector((state: RootState) => state.authUser);
  //coupon logic
  const handleApplyCoupon = () => {
    if (couponCode.length === 6) {
      setDiscount(50); //static copuon value
      showSuccessToast("Coupon applied: Got ₹50/- off");
    } else {
      setDiscount(0);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryCharges = 40;
  const total = subtotal - discount + deliveryCharges;

  const handleCheckout = () => {
    if (!selectedAddress || cartItems.length === 0) return;

    if (!authUser.isAuthenticated) {
      return navigate("/auth");
    }

    //  order object
    const order: OrderItem = {
      id: String(Date.now()), // unique id
      user_email: authUser.email,
      Date: new Date().toISOString(), // date
      address: `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.pincode}`,
      items: cartItems.map((item) => ({
        itemName: item.name,
        quantity: item.quantity,
        price: item.price,
        itemTotal: item.price * item.quantity,
      })),
      subTotal: cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      discount: discount,
      total: total,
      status: "placed",
    };

    dispatch(placeOrder(order));
    setTimeout(() => {
      navigate("/orders");
    }, 1500);

    dispatch(deselectAddress());

    setTimeout(() => {
      dispatch(clearCart());
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 3000);
  };

  return (
    <Grid2 size={{ xs: 12, md: 6 }}>
      <Typography
        fontFamily="Poppins"
        fontWeight={500}
        fontSize={{ xs: "20px", sm: "24px" }}
        marginBottom="20px"
      >
        Order Summary
      </Typography>

      <Stack
        spacing={2}
        sx={{ backgroundColor: "#fff", p: 3, borderRadius: "8px" }}
      >
        {selectedAddress && (
          <Typography fontFamily="Poppins" color="#666">
            Address :{" "}
            {`${selectedAddress?.street}, ${selectedAddress?.city}, ${selectedAddress?.state} - ${selectedAddress?.pincode}`}
          </Typography>
        )}

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent={"space-between"}
          spacing={1}
        >
          <TextField
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder="Apply coupon code"
            fullWidth
            helperText={
              couponCode !== "" && couponCode.length !== 6
                ? "Coupon Code must be 6 letter long"
                : ""
            }
            sx={{
              backgroundColor: "#F3F3F3",
              color: "#848484",
              fontFamily: "Poppins",
              fontWeight: 400,
              fontSize: { xs: "12px", sm: "14px" },
              lineHeight: { xs: "19px", sm: "21px" },
              letterSpacing: "0%",
              "& .MuiOutlinedInput-root": {
                height: { xs: "40px", sm: "auto" },
              },
            }}
          />
          <Button
            onClick={handleApplyCoupon}
            sx={{
              backgroundColor: "#FFA500",
              paddingX: { xs: "15px", sm: "25px" },
              minWidth: { xs: "100%", sm: "auto" },
              height: { xs: "40px", sm: "auto" },
              "&:hover": {
                backgroundColor: "#ff8c00",
              },
            }}
          >
            <Typography
              fontFamily={"Poppins"}
              fontWeight={400}
              fontSize={{ xs: "14px", sm: "16px", md: "18px" }}
              lineHeight={{ xs: "21px", sm: "24px", md: "27px" }}
              color={"#FFFFFF"}
            >
              Apply
            </Typography>
          </Button>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontFamily="Poppins" color="#666">
            Subtotal
          </Typography>
          <Typography fontFamily="Poppins">₹{subtotal}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontFamily="Poppins" color="#666">
            Discount
          </Typography>
          <Typography fontFamily="Poppins" color="green">
            -₹{discount}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontFamily="Poppins" color="#666">
            Delivery Charges
          </Typography>
          <Typography fontFamily="Poppins">₹{deliveryCharges}</Typography>
        </Stack>
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Typography fontFamily="Poppins" fontWeight={500}>
            Total
          </Typography>
          <Typography fontFamily="Poppins" fontWeight={500} color="#FFA500">
            ₹{total}
          </Typography>
        </Stack>

        <Button
          onClick={handleCheckout}
          disabled={!selectedAddress || cartItems.length === 0}
          sx={{
            backgroundColor: "#FFA500",
            color: "#fff",
            padding: "15px",
            mt: 2,
            "&:hover": { backgroundColor: "#ff8c00" },
            "&.Mui-disabled": { backgroundColor: "#ccc" },
          }}
        >
          <Typography fontFamily="Poppins">Proceed to Checkout</Typography>
        </Button>
      </Stack>
    </Grid2>
  );
};

export default OrderSummaryForm;
