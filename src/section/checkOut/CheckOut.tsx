import React, { useState } from "react";
import AddressSection from "./AddressSection";
import OrderSummary from "./OrderSummary";
import { Box, Grid2, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { useQuery } from "@tanstack/react-query";
import { getUserAddresses } from "../../util/util";

const CheckOut = () => {
  const authUser = useSelector((state: RootState) => state.authUser.authUser);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );

  const {
    data: addresses,
    isLoading: isLoadingAddresses,
    error: addressError,
  } = useQuery({
    queryKey: ["address", authUser.id],
    queryFn: getUserAddresses,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <Box sx={{ minHeight: "100vh", py: 4 }}>
      <Box sx={{ maxWidth: "1200px", margin: "0 auto", px: 2 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Checkout
        </Typography>

        <Grid2 container spacing={4}>
          {/* Left Column: Address Section */}
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Box sx={{ mb: 4 }}>
              <AddressSection
                addresses={addresses || []}
                selectedAddressId={selectedAddressId}
                onSelectAddress={setSelectedAddressId}
              />
            </Box>
          </Grid2>

          {/* Right Column: Order  */}
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <OrderSummary
              isAddressSelected={!!selectedAddressId}
              selectedAddressId={selectedAddressId}
            />
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

export default CheckOut;
