import React from "react";
import { Navigate } from "react-router-dom";
import { Box, Grid2 } from "@mui/material";

import mealItems from "../../data/mealItem";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from "../../redux/slices/CartSlice";
import { MealItem } from "../../types/type";
import ProductDescription from "./ProductDescription";

interface productDetailProp {
  id: string;
}

const Product: React.FC<productDetailProp> = ({ id }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const meal = mealItems.find((item) => item.id === id);

  if (!meal) {
    return <Navigate to="/" replace />;
  }

  const isItemInCart = (id: string) => cartItems.some((item) => item.id === id);
  const getItemQuantity = (id: string) =>
    cartItems.find((item) => item.id === id)?.quantity || 0;

  const handleAddToCart = (meal: MealItem) => {
    dispatch(
      addToCart({
        id: meal.id,
        itemId: meal.id,
        price: meal.price,
        quantity: 1,
        image: meal.image,
        name: meal.title,
        category: meal.category,
        description: meal.shortDescription,
        restaurantId: meal.restaurantId || "default", // Add this line
      })
    );
  };

  const handleIncrement = (itemId: string) => {
    dispatch(incrementQuantity(itemId));
  };

  const handleDecrement = (itemId: string) => {
    dispatch(decrementQuantity(itemId));
  };

  return (
    <Box
      maxWidth="1600px"
      width="90%"
      margin="auto"
      marginY={{ xs: "30px", md: "50px" }}
    >
      <Grid2 container spacing={{ xs: 3, md: 4 }} alignItems="flex-start">
        {/* Image Section */}
        <Grid2 size={{ sm: 12, md: 5 }}>
          <Box
            component="img"
            src={meal.image}
            alt={meal.title}
            width={"100%"}
            height={{ xs: "400px", sm: "400px", md: "500px" }}
            borderRadius={"16px"}
            boxShadow={"0 4px 12px rgba(0,0,0,0.1)"}
            sx={{
              objectFit: "cover",
            }}
          />
        </Grid2>

        {/* Description Section */}
        <ProductDescription
          meal={meal}
          onDecrement={handleDecrement}
          onIncrement={handleIncrement}
          onAddToCart={handleAddToCart}
          onGetItemQuantity={getItemQuantity}
          onIsItemInCart={isItemInCart}
        />
      </Grid2>
    </Box>
  );
};

export default Product;
