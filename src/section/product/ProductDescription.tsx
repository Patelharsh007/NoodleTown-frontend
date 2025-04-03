import {
  Grid2,
  Stack,
  Box,
  Typography,
  Button,
  ButtonGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { MealItem } from "../../types/type";
import {
  addToCartBackend,
  decrementCartMealBackend,
  getItemQuantitty,
  incrementCartMealBackend,
  isItemInCartBackend,
} from "../../util/util";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../../components/ToastContainer";

interface ProductDescriptionProps {
  meal: MealItem;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ meal }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [inCart, setInCart] = useState<boolean>(false);
  let [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/user/verifyUser",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const result = await response.json();

        if (result.status === "success") {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        setIsAuthenticated(false);
      }
    };

    verifyUser();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      isItemInCart(meal.mealId);
    }
  }, [isAuthenticated, meal, inCart, quantity]);

  const isItemInCart = async (mealId: string) => {
    if (!isAuthenticated) {
      setInCart(false);
      return;
    }

    try {
      const result = await isItemInCartBackend(mealId);
      getMealQuantity(mealId);
      setInCart(result);
    } catch (error) {
      // console.error("Error checking if item is in cart:", error);
      setInCart(false);
    }
  };

  const onAddToCart = async (mealId: string) => {
    if (!isAuthenticated) {
      showErrorToast("Access denied. Please log in.");
      return;
    }
    try {
      const result = await addToCartBackend(mealId);
      getMealQuantity(mealId);
      setInCart(true);
      showSuccessToast(result.message);
    } catch (error) {
      // console.error("Error adding/removing item from cart:", error);
      showErrorToast("An error occurred. Please try again.");
    }
  };
  const onIncrement1 = async (mealId: string) => {
    if (!isAuthenticated) {
      showErrorToast("Access denied. Please log in.");
      return;
    }
    try {
      const result = await incrementCartMealBackend(mealId);
      getMealQuantity(mealId);
      setInCart(true);
      showInfoToast(result.message);
    } catch (error) {
      if (error instanceof Error) {
        showErrorToast(error.message || "An error occurred. Please try again.");
      } else {
        showErrorToast("An error occurred. Please try again.");
      }
    }
  };
  const onDecrement1 = async (mealId: string) => {
    if (!isAuthenticated) {
      showErrorToast("Access denied. Please log in.");
      return;
    }
    try {
      if (quantity === 1) {
        const result = await decrementCartMealBackend(mealId);
        showErrorToast("Item removed from cart");
        setInCart(false);
        return;
      }
      const result = await decrementCartMealBackend(mealId);
      getMealQuantity(mealId);
      setInCart(true);
      showInfoToast(result.message);
    } catch (error) {
      if (error instanceof Error) {
        showErrorToast("Item removed from cart.");
      } else {
        showErrorToast("An error occurred. Please try again.");
      }
    }
  };

  const getMealQuantity = async (mealId: string) => {
    try {
      const result = await getItemQuantitty(mealId);
      setQuantity(result);
    } catch (error) {
      setQuantity(0);
    }
  };

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

            {!inCart ? (
              <Button
                onClick={() => onAddToCart(meal.mealId)}
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
                  onClick={() => onDecrement1(meal.mealId)}
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
                    {/* {onGetItemQuantity(meal.mealId)} */ quantity}
                  </Typography>
                </Button>
                <Button
                  // onClick={() => onIncrement(meal.mealId)}
                  onClick={() => onIncrement1(meal.mealId)}
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
