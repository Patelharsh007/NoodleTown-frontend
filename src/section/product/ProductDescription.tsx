import {
  Grid2,
  Stack,
  Box,
  Typography,
  Button,
  ButtonGroup,
} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MealItem } from "../../types/type";
import {
  getCartItemByMealId,
  addToCartBackend,
  decrementCartMealBackend,
  incrementCartMealBackend,
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
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["productCart", meal.mealId],
    queryFn: () => getCartItemByMealId(meal.mealId),
    staleTime: 5 * 60 * 1000,
  });

  const addToCartMutation = useMutation({
    mutationFn: (mealId: string) => addToCartBackend(mealId),
    onSuccess: (addData, variables) => {
      showSuccessToast(addData.message);
      queryClient.invalidateQueries({ queryKey: ["productCart", meal.mealId] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        showErrorToast(error.message || "An error occurred. Please try again.");
      } else {
        showErrorToast(
          "An error occurred while adding item to the cart. Please try again."
        );
      }
    },
  });
  const incrementItemMutation = useMutation({
    mutationFn: (mealId: string) => incrementCartMealBackend(mealId),
    onSuccess: (incrementData, variables) => {
      showInfoToast(incrementData.message);
      queryClient.invalidateQueries({ queryKey: ["productCart", meal.mealId] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        showErrorToast(error.message || "An error occurred. Please try again.");
      } else {
        showErrorToast(
          "An error occurred while adding item to the cart. Please try again."
        );
      }
    },
  });

  const decrementItemMutation = useMutation({
    mutationFn: (mealId: string) => decrementCartMealBackend(mealId),
    onSuccess: (decrementData, variables) => {
      if (decrementData && data.cartItem.quantity === 1) {
        showSuccessToast("Item removed from cart");
      } else {
        showInfoToast(decrementData.message);
      }
      queryClient.invalidateQueries({ queryKey: ["productCart", meal.mealId] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        showErrorToast(
          error.message ||
            "An error occurred while decrementing. Please try again."
        );
      } else {
        showErrorToast(
          "An unexpected error occurred while decrementing the item. Please try again."
        );
      }
    },
  });

  // const onAddToCart = async (mealId: string) => {
  //   try {
  //     const result = await addToCartBackend(mealId);
  //     showSuccessToast(result.message);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       showErrorToast(error.message || "An error occurred. Please try again.");
  //     } else {
  //       showErrorToast(
  //         "An error occurred while adding item to the cart. Please try again."
  //       );
  //     }
  //   }
  // };

  // const onIncrement1 = async (mealId: string) => {
  //   try {
  //     const result = await incrementCartMealBackend(mealId);
  //     showInfoToast(result.message);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       showErrorToast(
  //         error.message ||
  //           "An error occurred while incrementing. Please try again."
  //       );
  //     } else {
  //       showErrorToast(
  //         "An unexpected error occurred while incrementing the item. Please try again."
  //       );
  //     }
  //   }
  // };

  // const onDecrement1 = async (mealId: string) => {
  //   try {
  //     if (data.cartItem.quantity === 1) {
  //       const result = await decrementCartMealBackend(mealId);
  //       showSuccessToast("Item removed from cart");
  //       return;
  //     }
  //     const result = await decrementCartMealBackend(mealId);
  //     showInfoToast(result.message);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       showErrorToast(
  //         error.message ||
  //           "An error occurred while decrementing. Please try again."
  //       );
  //     } else {
  //       showErrorToast(
  //         "An unexpected error occurred while decrementing the item. Please try again."
  //       );
  //     }
  //   }
  // };

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

            {isLoading ? (
              <Button
                // onClick={() => onAddToCart(meal.mealId)}
                disabled={isLoading}
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
            ) : data && !data.isInCart ? (
              <Button
                onClick={() => addToCartMutation.mutate(meal.mealId)}
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
                  onClick={() => decrementItemMutation.mutate(meal.mealId)}
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
                    {data && data.cartItem.quantity}
                  </Typography>
                </Button>
                <Button
                  onClick={() => incrementItemMutation.mutate(meal.mealId)}
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
