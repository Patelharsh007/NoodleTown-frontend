import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Container, Grid2, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import {
  incrementQuantity,
  decrementQuantity,
} from "../../redux/slices/CartSlice";
import ProductDescription from "./ProductDescription";
import { fetchMealDetailById } from "../../util/util";
import ProductSkeleton from "../../skeleton/ProductSkeleton";

interface productDetailProp {
  id: string;
}

const Product: React.FC<productDetailProp> = ({ id }) => {
  const dispatch = useDispatch();

  const {
    data: meal,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mealDetails", id],
    queryFn: () => fetchMealDetailById(id),
  });

  if (error) {
    return (
      <Container maxWidth="md" sx={{ marginTop: { xs: "40px" } }}>
        <Typography variant="body1" color="error" textAlign="center">
          No data found. Please check your internet connection or try again
          later.
        </Typography>
      </Container>
    );
  }

  return (
    <Box
      maxWidth="1600px"
      width="90%"
      margin="auto"
      marginY={{ xs: "30px", md: "50px" }}
    >
      <Grid2 container spacing={{ xs: 3, md: 4 }} alignItems="flex-start">
        {isLoading ? (
          <ProductSkeleton />
        ) : (
          <>
            <Grid2 size={{ sm: 12, md: 5 }}>
              <Box
                component="img"
                src={meal?.image}
                alt={meal?.title}
                width={"100%"}
                height={{ xs: "400px", sm: "400px", md: "500px" }}
                borderRadius={"16px"}
                boxShadow={"0 4px 12px rgba(0,0,0,0.1)"}
                sx={{
                  objectFit: "cover",
                }}
              />
            </Grid2>

            {meal ? (
              <ProductDescription meal={meal} />
            ) : (
              <>Something went wrong</>
            )}
          </>
        )}
      </Grid2>
    </Box>
  );
};

export default Product;
