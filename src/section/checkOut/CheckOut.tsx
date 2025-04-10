import React, { useState } from "react";
import AddressSection from "./AddressSection";
import OrderSummary from "./OrderSummary";
import { AddressItem, OrderItem } from "../../types/type";
import { mockAddresses, mockCartItems } from "../../data/MockData";
import { Box, Grid2, Typography } from "@mui/material";
import {
  showSuccessToast,
  showErrorToast,
  showInfoToast,
} from "../../components/ToastContainer";

const CheckOut = () => {
  const [addresses, setAddresses] = useState<AddressItem[]>(mockAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );

  const handleCheckout = (orderData: OrderItem) => {
    if (!selectedAddressId) {
      showErrorToast("Please select an address");
      return;
    }

    const selectedAddress = addresses.find(
      (addr) => addr.id === selectedAddressId
    );

    const fullOrder = {
      ...orderData,
      address: {
        street: selectedAddress?.street,
        city: selectedAddress?.city,
        state: selectedAddress?.state,
        pincode: selectedAddress?.pincode,
      },
      status: "pending",
      orderedAt: new Date().toISOString(),
    };

    console.log("Order placed:", fullOrder);

    showSuccessToast("Order placed successfully!");
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
                addresses={addresses}
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
