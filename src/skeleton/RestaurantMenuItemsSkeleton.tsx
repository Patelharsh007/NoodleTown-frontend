import { Grid2, Skeleton, Stack } from "@mui/material";
import React from "react";

const RestaurantMenuItemsSkeleton = () => {
  return (
    <>
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <>
            <Grid2 key={index} size={{ xs: 12, sm: 6 }} paddingY={"10px"}>
              {/* Skeleton for image */}
              <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                sx={{
                  width: { xs: "100%", sm: "95%" },
                  height: { xs: "190px", sm: "270px" },
                  borderRadius: "16px",
                  marginBottom: "10px",
                }}
              />
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 6 }} sx={{ marginBottom: "50px" }}>
              {/* Skeleton for text (title, description, price) */}
              <Stack
                spacing={{ xs: "2px", sm: "9px" }}
                paddingTop={{ sm: "5px" }}
              >
                <Skeleton width="80%" height={30} animation="wave" />
                <Skeleton width="60%" height={20} animation="wave" />
                <Skeleton width="50%" height={20} animation="wave" />
              </Stack>
              {/* Skeleton for buttons */}
              <Stack
                spacing={1}
                marginTop={2}
                direction="row"
                justifyContent="space-between"
              >
                <Skeleton
                  variant="rectangular"
                  width={175}
                  height={45}
                  animation="wave"
                />
              </Stack>
            </Grid2>
          </>
        ))}
    </>
  );
};

export default RestaurantMenuItemsSkeleton;
