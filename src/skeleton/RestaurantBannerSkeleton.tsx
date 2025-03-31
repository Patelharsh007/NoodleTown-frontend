import { Box, Skeleton } from "@mui/material";
import React from "react";

const RestaurantBannerSkeleton = () => {
  return (
    <>
      <Box
        width={"100%"}
        margin={{ xs: "30px auto", sm: "50px auto" }}
        display={"grid"}
        gridTemplateAreas={{
          xs: '"first" "second" "third"',
          sm: '"first second" "first third"',
        }}
        gridTemplateColumns={{ xs: "1fr", sm: "1.1fr 0.9fr" }}
        gap={"10px"}
      >
        {/* Skeleton loader for images */}
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          sx={{
            gridArea: "first",
            height: { xs: "200px", sm: "500px", lg: "600px" },
          }}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          sx={{
            gridArea: "second",
            height: { xs: "200px", sm: "245px", lg: "295px" },
          }}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          sx={{
            gridArea: "third",
            height: { xs: "200px", sm: "245px", lg: "295px" },
          }}
        />
      </Box>
    </>
  );
};

export default RestaurantBannerSkeleton;
