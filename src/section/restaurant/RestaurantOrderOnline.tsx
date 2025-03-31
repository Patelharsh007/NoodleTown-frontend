import { Container, Grid2, Typography } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../../redux/slices/CartSlice";
import { RootState } from "../../redux/Store";

import RestaurantOrderCategories from "../../components/RestaurantOrderCategories";
import RestaurantOrderMenuItems from "../../components/RestaurantOrderMenuItems";
import { fetchMenuCategories } from "../../util/util";

interface restaurantProps {
  id: string;
}

interface MealItem {
  id: number;
  mealId: string;
  restaurantId: string;
  category: string;
  image: string;
  title: string;
  shortDescription: string;
  fullDescription: string[];
  price: number;
  isPopular: boolean;
}

const RestaurantOrderOnline: React.FC<restaurantProps> = ({ id }) => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Recommended");

  const {
    data: categoriesCount,
    isLoading: isLoading1,
    error: error1,
  } = useQuery({
    queryKey: ["MenuCategories", id],
    queryFn: () => fetchMenuCategories(id),
  });

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  //redux cart
  const dispatch = useDispatch();

  // .selector to get cart items
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const isItemInCart = (mealId: string) => {
    return cartItems.some((item) => item.id === mealId);
  };

  const getItemQuantity = (mealId: string) => {
    const cartItem = cartItems.find((item) => item.id === mealId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = (meal: MealItem) => {
    if (!meal) return;

    if (!isItemInCart(meal.mealId)) {
      dispatch(
        addToCart({
          id: meal.mealId,
          itemId: meal.mealId,
          name: meal.title,
          price: meal.price,
          quantity: 1,
          image: meal.image,
          restaurantId: meal.restaurantId,
          category: meal.category,
          description: meal.shortDescription,
        })
      );
    }
  };

  const handleIncrementMeal = (mealId: string) => {
    dispatch(incrementQuantity(mealId));
  };

  const handleDecrementMeal = (mealId: string) => {
    dispatch(decrementQuantity(mealId));
  };

  // if (error) {
  //   return (
  //     <Container maxWidth="md" sx={{ marginTop: { xs: "40px" } }}></Container>
  //   );
  // }

  return (
    <>
      <Container sx={{ padding: "20px" }}>
        <Typography
          fontFamily={"Poppins"}
          fontWeight={500}
          fontSize={{ xs: "28px", sm: "24px" }}
          lineHeight={{ xs: "40px", sm: "36px" }}
          letterSpacing="0%"
          color={"#000000"}
          textAlign={{ xs: "center", sm: "left" }}
        >
          Order Online
        </Typography>
        <Grid2 container width={"100%"} marginY={"40px"}>
          <RestaurantOrderCategories
            categoriesCount={categoriesCount}
            Category={selectedCategory}
            onCategoryClick={handleCategoryClick}
          />
          <RestaurantOrderMenuItems
            id={id}
            Category={selectedCategory}
            onAddToCart={handleAddToCart}
            onIsItemInCart={isItemInCart}
            onIncrementItem={handleIncrementMeal}
            onDecrementItem={handleDecrementMeal}
            onGetItemQuantity={getItemQuantity}
          />
        </Grid2>
      </Container>
    </>
  );
};

export default RestaurantOrderOnline;
