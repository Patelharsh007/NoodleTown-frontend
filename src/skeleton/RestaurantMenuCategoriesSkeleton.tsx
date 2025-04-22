import { Skeleton } from "@mui/material";
import React from "react";

const RestaurantMenuCategoriesSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          animation="wave"
          width="100%"
          height={50}
          sx={{
            borderRadius: "8px",
          }}
        />
      ))}
    </>
  );
};

export default RestaurantMenuCategoriesSkeleton;
