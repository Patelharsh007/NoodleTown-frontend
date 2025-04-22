import {
  Grid2,
  Stack,
  Box,
  Typography,
  Button,
  ButtonGroup,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import useCart from "../../hooks/useCartMeal";
import { CartItem, MealItem } from "../../types/type";
import debounce from "lodash.debounce";

interface ProductDescriptionProps {
  meal: MealItem;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ meal }) => {
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const { cart, isLoadingCart, addToCart, incrementItem, decrementItem } =
    useCart();

  // Debounce the mutation call
  const debouncedIncrement = useRef(
    debounce((mealId: string) => {
      incrementItem(mealId);
    }, 250)
  ).current;

  const debouncedDecrement = useRef(
    debounce((mealId: string) => {
      decrementItem(mealId);
    }, 250)
  ).current;

  useEffect(() => {
    // console.log("use effect called");

    if (cart && cart.length > 0) {
      const itemInCart = cart.some(
        (cartItem: CartItem) => cartItem.mealId === meal.mealId
      );
      setIsInCart(itemInCart);
    } else {
      setIsInCart(false);
    }
  }, [cart, meal]);

  return (
    <Grid2 size={{ sm: 12, md: 7 }}>
      {meal && (
        <Stack
          spacing={{ xs: 2.5, md: 3.5 }}
          padding={{ xs: "20px", sm: "30px" }}
          borderRadius={"16px"}
          boxShadow={"0 4px 12px rgba(0,0,0,0.05)"}
          sx={{
            backgroundColor: "#fff",
          }}
        >
          {/* Title and Price */}
          <Stack>
            <Typography
              fontFamily="Poppins"
              fontWeight={700}
              fontSize={{ xs: "26px", sm: "30px", md: "36px" }}
              color="#000"
              sx={{ lineHeight: 1.2 }}
            >
              {/* {meal.restaurantName} */}
              {meal.restaurant?.title}
            </Typography>
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            spacing={2}
          >
            <Typography
              fontFamily="Poppins"
              fontWeight={600}
              fontSize={{ xs: "24px", sm: "28px", md: "32px" }}
              color="#000"
              sx={{ lineHeight: 1.2 }}
            >
              {meal.title}
            </Typography>

            <Typography
              fontFamily="Poppins"
              fontWeight={500}
              fontSize={{ xs: "22px", sm: "24px", md: "28px" }}
              color="#FFA500"
              sx={{ whiteSpace: "nowrap" }}
            >
              ₹{meal.price}
            </Typography>
          </Stack>

          {/* Category and Cart Actions */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            spacing={2}
          >
            <Typography
              fontFamily="Poppins"
              fontSize={{ xs: "14px", sm: "16px" }}
              color="#666"
              sx={{
                padding: "8px 16px",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                display: "inline-block",
              }}
            >
              {meal.category}
            </Typography>

            {isLoadingCart ? (
              <Button
                disabled={isLoadingCart}
                sx={{
                  padding: "12px 24px",
                  borderRadius: "8px",
                  width: { xs: "100%", sm: "auto" },
                  backgroundColor: "#FFA500",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#FFC300",
                  },
                }}
              >
                <Typography fontFamily="Poppins" fontWeight={500}>
                  Add to Cart
                </Typography>
              </Button>
            ) : !isInCart ? (
              <Button
                onClick={() => addToCart(meal.mealId)}
                sx={{
                  padding: "12px 24px",
                  borderRadius: "8px",
                  width: { xs: "100%", sm: "auto" },
                  backgroundColor: "#FFA500",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#FFC300",
                  },
                }}
              >
                <Typography fontFamily="Poppins" fontWeight={500}>
                  Add to Cart
                </Typography>
              </Button>
            ) : (
              <ButtonGroup
                disableElevation
                sx={{
                  height: "45px",
                  width: { xs: "100%", sm: "auto" },
                  "& .MuiButtonGroup-grouped:not(:last-of-type)": {
                    borderColor: "transparent",
                  },
                }}
              >
                <Button
                  onClick={() => debouncedDecrement(meal.mealId)}
                  sx={{
                    flex: 1,
                    backgroundColor: "#999999",
                    color: "#ffffff",
                    "&:hover": {
                      backgroundColor: "#888888",
                      color: "#f3f3f3",
                    },
                  }}
                >
                  <RemoveIcon />
                </Button>
                <Button
                  sx={{
                    flex: 2,
                    backgroundColor: "#f9f9f9",
                    color: "#000000",
                    borderLeft: "1px solid rgba(0,0,0,0.1)",
                    borderRight: "1px solid rgba(0,0,0,0.1)",
                    "&:hover": {
                      backgroundColor: "#d9d9d9",
                    },
                    cursor: "default",
                  }}
                  disableRipple
                >
                  <Typography fontFamily="Poppins" fontSize="18px">
                    {cart &&
                    cart.length > 0 &&
                    cart.find(
                      (cartItem: CartItem) => cartItem.mealId === meal.mealId
                    )
                      ? cart.find(
                          (cartItem: CartItem) =>
                            cartItem.mealId === meal.mealId
                        )?.quantity || 0
                      : 0}
                  </Typography>
                </Button>
                <Button
                  onClick={() => debouncedIncrement(meal.mealId)}
                  sx={{
                    flex: 1,
                    backgroundColor: "#FFA500",
                    color: "#FFFFFF",
                    "&:hover": {
                      backgroundColor: "#FFC300",
                    },
                  }}
                >
                  <AddIcon />
                </Button>
              </ButtonGroup>
            )}
          </Stack>

          {/* Description Section */}
          <Box sx={{ mt: { xs: 2, md: 4 } }}>
            <Typography
              fontFamily="Poppins"
              fontSize={{ xs: "16px", sm: "18px" }}
              color="#333"
              fontWeight={500}
              sx={{ mb: 2 }}
            >
              {meal.shortDescription}
            </Typography>

            <Typography
              fontFamily="Poppins"
              fontSize={{ xs: "14px", sm: "16px" }}
              color="#666"
              lineHeight={1.8}
              sx={{
                backgroundColor: "#fafafa",
                padding: "20px",
                borderRadius: "12px",
              }}
            >
              {meal.fullDescription}
            </Typography>
          </Box>
        </Stack>
      )}
    </Grid2>
  );
};

export default ProductDescription;
