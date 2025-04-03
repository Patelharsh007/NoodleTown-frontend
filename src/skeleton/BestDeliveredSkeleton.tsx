import { Box, Skeleton } from "@mui/material";
import React from "react";

const BestDeliveredSkeleton = () => {
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <Box
          key={index}
          id="best-delivered-box"
          width={{ sm: "246px", md: "200px", lg: "246px" }}
          height={{ sm: "317px", md: "280px", lg: "317px" }}
          padding={{ sm: "30px", md: "10px" }}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          position={"relative"}
        >
          <Skeleton
            variant="circular"
            animation="wave"
            sx={{
              width: { sm: "246px", md: "200px", lg: "246px" },
              height: { sm: "246px", md: "200px", lg: "246px" },
            }}
          />

          <Skeleton
            variant="text"
            width="60%"
            height={30}
            sx={{ marginTop: 2, margin: "0 auto" }}
          />
        </Box>
      ))}
    </>
  );
};

export default BestDeliveredSkeleton;
