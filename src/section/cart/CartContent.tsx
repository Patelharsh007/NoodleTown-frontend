import { Box, Button, Grid2, Stack, Typography, Skeleton } from "@mui/material";
import React from "react";
import CartCard from "../../components/CartCard";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
} from "../../redux/slices/CartSlice";
import { RootState } from "../../redux/Store";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useQuery } from "@tanstack/react-query";
import { CartItem, MealItem } from "../../types/type";
import { getUserCart } from "../../util/util";
import useCart from "../../hooks/useCartMeal";

const CartContent = () => {
  const { cart, isLoadingCart, errorCart } = useCart();

  const navigate = useNavigate();

  return (
    <>
      <Box maxWidth={"1600px"} width={"90%"} margin={"auto"}>
        <Grid2 container spacing={3} margin={"30px 0"}>
          {isLoadingCart ? (
            <>
              {[...Array(4)].map((_, index) => (
                <Grid2 key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <Box
                    padding={{ xs: "15px", sm: "30px" }}
                    borderRadius={"17px"}
                    sx={{ backgroundColor: "#F9F9F9" }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={190}
                      sx={{ borderRadius: "16px" }}
                    />
                    <Stack spacing={1.5} sx={{ marginTop: "15px" }}>
                      <Skeleton variant="text" width="60%" height={30} />
                      <Skeleton variant="text" width="40%" height={30} />
                      <Skeleton variant="text" width="80%" height={20} />
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={40}
                      />
                    </Stack>
                  </Box>
                </Grid2>
              ))}
            </>
          ) : cart && cart.length > 0 ? (
            cart.map((item: CartItem) => <CartCard item={item} key={item.id} />)
          ) : (
            <>
              <Stack margin={"auto"}>
                <Box
                  component={"img"}
                  width={"90%"}
                  margin={"auto"}
                  height={"350px"}
                  src={`${assets.images.cart.emptyCart}`}
                />

                <Button
                  onClick={() => {
                    navigate("/menu");
                  }}
                  variant="contained"
                  sx={{
                    height: "50px",
                    backgroundColor: "#FFC300",
                    "&:hover": {
                      backgroundColor: "#FFA500",
                    },
                  }}
                >
                  <Typography
                    textAlign="center"
                    marginY={4}
                    color={"#f3f3f3"}
                    fontSize="1rem"
                  >
                    Continue Ordering Delicious Food
                  </Typography>
                </Button>
              </Stack>
            </>
          )}
        </Grid2>
      </Box>
    </>
  );
};

export default CartContent;
