import { Skeleton } from "@mui/material";
import React from "react";

const CarosuelItemsSkeleton = () => {
  return (
    <>
      {[...Array(4)].map((_, index) => (
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={"250px"}
          height={"400px"}
          sx={{
            margin: "auto 20px",
            borderRadius: "10px",
            boxShadow: "10px 5px 10px 0px #8F5C201A",
          }}
        />
      ))}
    </>
  );
};

export default CarosuelItemsSkeleton;
