import { Grid2, Skeleton } from "@mui/material";
import React from "react";

const RestaurantMenuSkeleton = () => {
  return (
    <>
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} marginTop={"30px"} key={index}>
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="100%"
              sx={{
                height: { xs: "100%", sm: "500px" },
                borderRadius: "20px",
              }}
            />
            <Skeleton
              variant="text"
              animation="wave"
              width="60%"
              height={30}
              sx={{
                marginTop: "16px",
                marginLeft: "16px",
                textAlign: "center",
              }}
            />
          </Grid2>
        ))}
    </>
  );
};

export default RestaurantMenuSkeleton;
