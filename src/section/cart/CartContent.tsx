import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
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

const CartContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleIncrement = (itemId: string) => {
    dispatch(incrementQuantity(itemId));
  };

  const handleDecrement = (itemId: string) => {
    dispatch(decrementQuantity(itemId));
  };

  return (
    <>
      <Box maxWidth={"1600px"} width={"90%"} margin={"auto"}>
        <Grid2 container spacing={3} margin={"30px 0"}>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartCard
                item={item}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                key={item.id}
              />
            ))
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
