import React from "react";
import { Grid2, Skeleton, Stack } from "@mui/material";

const RestaurantDetailSkeleton = () => {
  return (
    <>
      <Grid2 container spacing={"20px"}>
        <Grid2
          size={{ xs: 12, sm: 3 }}
          display={"flex"}
          justifyContent={{ xs: "center", sm: "flex-start" }}
          alignItems={{ xs: "center", sm: "self-start" }}
        >
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{
              width: { xs: "187px", sm: "160px", md: "187px" },
              height: { xs: "186px", sm: "159px", md: "186px" },
              borderRadius: "4px",
            }}
          />
        </Grid2>

        {/* Restaurant info content */}
        <Grid2 size={{ xs: 12, sm: 9 }} width={"100%"}>
          <Stack width={"87%"} margin="auto" gap={"15px"} direction={"column"}>
            <Skeleton variant="text" animation="wave" width="60%" height={36} />

            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              gap="15px"
            >
              <Skeleton
                variant="text"
                animation="wave"
                width="30%"
                height={16}
              />
              <Skeleton
                variant="text"
                animation="wave"
                width="40%"
                height={16}
              />
            </Stack>

            <Skeleton
              variant="text"
              animation="wave"
              width="100%"
              height={16}
            />

            <Skeleton
              variant="text"
              animation="wave"
              width="100%"
              height={16}
            />

            {/* Buttons */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              gap={{ xs: 2, sm: 3 }}
              width="100%"
              alignItems={{ xs: "center" }}
            >
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    sx={{
                      width: { xs: "80%", sm: "33%" },
                      paddingY: { xs: 1, sm: 1.5 },

                      color: "#000000",
                    }}
                  />
                ))}
            </Stack>
          </Stack>
        </Grid2>
      </Grid2>
    </>
  );
};

export default RestaurantDetailSkeleton;
