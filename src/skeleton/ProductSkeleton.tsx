import { Grid2, Skeleton } from "@mui/material";
import React from "react";

const ProductSkeleton = () => {
  return (
    <>
      <Grid2 size={{ sm: 12, md: 5 }}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height={500}
        />
      </Grid2>

      <Grid2 size={{ sm: 12, md: 7 }}>
        <Skeleton animation="wave" variant="text" width="60%" height={40} />
        <Skeleton
          animation="wave"
          variant="text"
          width="40%"
          height={20}
          sx={{ marginTop: 1 }}
        />
        <Skeleton
          animation="wave"
          variant="text"
          width="80%"
          height={20}
          sx={{ marginTop: 2 }}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="60%"
          height={50}
          sx={{ marginTop: 2 }}
        />
      </Grid2>
    </>
  );
};

export default ProductSkeleton;
