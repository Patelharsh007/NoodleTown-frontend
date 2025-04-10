import React, { useState } from "react";
import AddressSection from "./AddressSection";
import OrderSummary from "./OrderSummary";

import { AddressItem, Order } from "../../types/type";
import { Box, Grid2, Typography } from "@mui/material";
import {
  showSuccessToast,
  showErrorToast,
  showInfoToast,
} from "../../components/ToastContainer";
import useCart from "../../hooks/useCartMeal";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { useQuery } from "@tanstack/react-query";
import { getUserAddresses } from "../../util/util";

const CheckOut = () => {
  const authUser = useSelector((state: RootState) => state.authUser.authUser);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );

  const [orderData, setOrderData] = useState<Order | null>(null);

  const {
    data: addresses,
    isLoading: isLoadingAddresses,
    error: addressError,
  } = useQuery({
    queryKey: ["address", authUser.id],
    queryFn: getUserAddresses,
    staleTime: 5 * 60 * 1000,
  });

  const handleCheckout = (orderData: Order) => {
    if (!selectedAddressId) {
      showErrorToast("Please select an address");
      return;
    }

    const selectedAddress = addresses?.find(
      (addr: AddressItem) => addr.id === selectedAddressId
    );

    if (!selectedAddress) {
      showErrorToast("Selected address not found");
      return;
    }

    const fullOrder: Order = {
      ...orderData,
      address: selectedAddress,
      status: "pending",
      orderedAt: new Date().toISOString(),
    };

    setOrderData(fullOrder);
  };

  const handlePaymentSuccess = () => {
    if (orderData) {
      console.log("Order placed:", orderData);
      showSuccessToast("Order placed successfully!");
      setOrderData(null);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 4 }}>
      <Box sx={{ maxWidth: "1200px", margin: "0 auto", px: 2 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Checkout
        </Typography>

        <Grid2 container spacing={4}>
          {/* Left Column: Address Section & Payment */}
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Box sx={{ mb: 4 }}>
              <AddressSection
                addresses={addresses || []}
                selectedAddressId={selectedAddressId}
                onSelectAddress={setSelectedAddressId}
              />
            </Box>
          </Grid2>

          {/* Right Column: Order Summary */}
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <OrderSummary
              isAddressSelected={!!selectedAddressId}
              onCheckout={handleCheckout}
            />
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

export default CheckOut;
