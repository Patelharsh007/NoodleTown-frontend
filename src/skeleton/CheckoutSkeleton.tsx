import React from "react";
import { Box, Grid2, Skeleton, Stack } from "@mui/material";

const CheckoutSkeleton = () => {
  return (
    <Box sx={{ minHeight: "100vh", py: 4 }}>
      <Box sx={{ maxWidth: "1200px", margin: "0 auto", px: 2 }}>
        <Skeleton
          variant="text"
          width="200px"
          height={50}
          sx={{ mb: 4 }}
        />

        <Grid2 container spacing={4}>
          {/* Left Column: Address Section Skeleton */}
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Box sx={{ mb: 4 }}>
              <Skeleton
                variant="text"
                width="150px"
                height={30}
                sx={{ mb: 2 }}
              />
              <Skeleton
                variant="rectangular"
                height={200}
                sx={{ borderRadius: 2, mb: 2 }}
              />
              <Stack spacing={2} sx={{ mb: 3 }}>
                <Skeleton variant="text" width="80%" height={20} />
                <Skeleton variant="text" width="60%" height={20} />
                <Skeleton variant="text" width="70%" height={20} />
              </Stack>
              <Skeleton
                variant="rectangular"
                height={100}
                sx={{ borderRadius: 2 }}
              />
            </Box>
          </Grid2>

          {/* Right Column: Order Summary Skeleton */}
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Box sx={{ mb: 4 }}>
              <Skeleton
                variant="text"
                width="180px"
                height={30}
                sx={{ mb: 2 }}
              />
              <Skeleton
                variant="rectangular"
                height={150}
                sx={{ borderRadius: 2, mb: 2 }}
              />
              <Stack spacing={2} sx={{ mb: 3 }}>
                <Skeleton variant="text" width="90%" height={20} />
                <Skeleton variant="text" width="70%" height={20} />
                <Skeleton variant="text" width="80%" height={20} />
                <Skeleton variant="text" width="60%" height={20} />
              </Stack>
              <Skeleton
                variant="rectangular"
                height={50}
                sx={{ borderRadius: 2, mb: 2 }}
              />
              <Skeleton
                variant="rectangular"
                height={60}
                sx={{ borderRadius: 2 }}
              />
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

export default CheckoutSkeleton; 