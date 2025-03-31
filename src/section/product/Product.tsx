import React from "react";
import { useQuery } from "react-query";
import { Box, Grid2, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from "../../redux/slices/CartSlice";
import ProductDescription from "./ProductDescription";
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

  const {
    data: meal,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mealDetails"],
    queryFn: () => fetchMealDetailById(id),
  });

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

  return (
    <Box
      maxWidth="1600px"
      width="90%"
      margin="auto"
      marginY={{ xs: "30px", md: "50px" }}
    >
      <Grid2 container spacing={{ xs: 3, md: 4 }} alignItems="flex-start">
        {isLoading ? (
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
              <Skeleton
                animation="wave"
                variant="text"
                width="60%"
                height={40}
              />
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
