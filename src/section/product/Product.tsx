import React, { useEffect, useState } from "react";

import { Box, Grid2, Skeleton } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from "../../redux/slices/CartSlice";

import ProductDescription from "./ProductDescription";
import { showErrorToast } from "../../components/ToastContainer";
import { useQuery } from "react-query";
import { fetchMealDetailById } from "../../util/util";

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
  restaurant?: {
    title: string;
  };
}

interface productDetailProp {
  id: string;
}

const Product: React.FC<productDetailProp> = ({ id }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  // const meal = mealItems.find((item) => item.id === id);
  // const [meal, setMeal] = useState<MealItem | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    data: meal,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mealDetails"],
    queryFn: () => fetchMealDetailById(id),
  });

  console.log(meal);

  const isItemInCart = (id: string) => cartItems.some((item) => item.id === id);
  const getItemQuantity = (id: string) =>
    cartItems.find((item) => item.id === id)?.quantity || 0;

  const handleAddToCart = (meal: MealItem) => {
    dispatch(
      addToCart({
        id: meal.mealId,
        itemId: meal.mealId,
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

  // const fetchMealDetailById = async (id: string) => {
  //   try {
  //     const url = `http://localhost:8080/api/meal/${id}`;
  //     const response = await fetch(url, { method: "GET" });
  //     const result = await response.json();

  //     if (result.status === "success") {
  //       setMeal(result.meal[0]);
  //     } else {
  //       showErrorToast(result.message);
  //     }
  //   } catch (error) {
  //     console.error(`Error: ${error}`);
  //     showErrorToast("Some error occurred.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Box
      maxWidth="1600px"
      width="90%"
      margin="auto"
      marginY={{ xs: "30px", md: "50px" }}
    >
      <Grid2 container spacing={{ xs: 3, md: 4 }} alignItems="flex-start">
        {loading ? (
          <>
            <Grid2 size={{ sm: 12, md: 5 }}>
              <Skeleton variant="rectangular" width="100%" height={500} />
            </Grid2>

            <Grid2 size={{ sm: 12, md: 7 }}>
              <Skeleton variant="text" width="60%" height={40} />
              <Skeleton
                variant="text"
                width="40%"
                height={20}
                sx={{ marginTop: 1 }}
              />
              <Skeleton
                variant="text"
                width="80%"
                height={20}
                sx={{ marginTop: 2 }}
              />
              <Skeleton
                variant="rectangular"
                width="60%"
                height={50}
                sx={{ marginTop: 2 }}
              />
            </Grid2>
          </>
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

            <ProductDescription
              meal={meal}
              onDecrement={handleDecrement}
              onIncrement={handleIncrement}
              onAddToCart={handleAddToCart}
              onGetItemQuantity={getItemQuantity}
              onIsItemInCart={isItemInCart}
            />
          </>
        )}
      </Grid2>
    </Box>
  );
};

export default Product;
