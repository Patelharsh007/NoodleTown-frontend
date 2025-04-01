import React from "react";
import Skeleton from "@mui/material/Skeleton";

const CarosuelCategoriesSkeleton: React.FC = () => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          animation="wave"
          width={100}
          height={50}
          sx={{
            borderRadius: "45px",
            marginBottom: "10px",
          }}
        />
      ))}
    </>
  );
};

export default CarosuelCategoriesSkeleton;
