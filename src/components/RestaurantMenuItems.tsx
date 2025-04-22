import {
  Box,
  Grid2,
  Typography,
  Stack,
  ButtonGroup,
  Button,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCartMeal";
import { CartItem, MealItem } from "../types/type";
import debounce from "lodash.debounce";

interface RestaurantOrderMenuItemsProps {
  meal: MealItem;
}

const RestaurantMenuItems: React.FC<RestaurantOrderMenuItemsProps> = ({
  meal,
}) => {
  const [isInCart, setIsInCart] = useState<boolean>(false);

  const {
    cart,
    isLoadingCart,
    errorCart,
    addToCart,
    incrementItem,
    decrementItem,
  } = useCart();

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
    if (cart && cart.length > 0) {
      const itemInCart = cart.some(
        (cartItem: CartItem) => cartItem.mealId === meal.mealId
      );
      setIsInCart(itemInCart);
    }
  }, [cart, meal.mealId]);

  return (
    <React.Fragment key={meal.mealId}>
      <Grid2 size={{ xs: 12, sm: 6 }} paddingY={"20px"}>
        <Link to={`/product/${meal.mealId}`} style={{ textDecoration: "none" }}>
          <Box
            component={"img"}
            src={meal.image}
            alt={meal.title}
            width={{ xs: "100%", sm: "95%" }}
            margin={"auto"}
            height={{ xs: "190px", sm: "270px" }}
            borderRadius={"16px"}
            sx={{
              objectFit: "cover",
              objectPosition: "center center",
            }}
          />
        </Link>
      </Grid2>

      <Grid2
        size={{ xs: 12, sm: 6 }}
        sx={{ marginBottom: "50px" }}
        paddingY={"20px"}
        paddingTop={{ xs: "5px", sm: "20px" }}
      >
        <Stack spacing={{ xs: "6px", sm: "15px" }} paddingTop={{ sm: "5px" }}>
          <Typography
            fontFamily="Poppins"
            fontWeight={400}
            fontSize={{ xs: "20px", sm: "18px", md: "20px" }}
            lineHeight={{
              xs: "30px",
              sm: "28px",
              md: "30px",
            }}
          >
            {meal.title}
          </Typography>
          <Typography
            fontFamily="Poppins"
            fontWeight={400}
            fontSize={{ xs: "14px", sm: "12px", md: "14px" }}
            lineHeight={{
              xs: "21px",
              sm: "18px",
              md: "21px",
            }}
            color="#848484"
          >
            {meal.shortDescription}
          </Typography>
          <Typography
            fontFamily="Poppins"
            fontWeight={400}
            fontSize={{ xs: "20px", sm: "18px", md: "20px" }}
            lineHeight={{
              xs: "30px",
              sm: "28px",
              md: "30px",
            }}
          >
            ₹{meal.price}
          </Typography>

          {isLoadingCart ? (
            <>
              <Button
                disabled={isLoadingCart}
                sx={{
                  height: "37px",
                  width: "175px",
                  backgroundColor: "#FFA500",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#FFC300",
                  },
                }}
              >
                <Typography
                  fontFamily="Poppins"
                  fontWeight={400}
                  fontSize={{
                    xs: "20px",
                    sm: "18px",
                    md: "20px",
                  }}
                  lineHeight={{
                    xs: "30px",
                    sm: "28px",
                    md: "30px",
                  }}
                >
                  Add to Cart
                </Typography>{" "}
              </Button>
            </>
          ) : (
            <>
              {cart && cart.length > 0 && isInCart ? (
                <ButtonGroup
                  disableElevation
                  sx={{
                    height: "37px",
                    width: "150px",
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
                      flex: 1.5,
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
                    <Typography
                      fontFamily="Poppins"
                      fontWeight={400}
                      fontSize={{
                        xs: "18px",
                        sm: "16px",
                        md: "18px",
                      }}
                    >
                      {isLoadingCart ? (
                        <CircularProgress />
                      ) : cart.length > 0 && isInCart ? (
                        cart.find(
                          (cartItem: CartItem) =>
                            cartItem.mealId === meal.mealId
                        )?.quantity || 0
                      ) : (
                        0
                      )}
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
              ) : (
                <>
                  <Button
                    onClick={() => addToCart(meal.mealId)}
                    sx={{
                      height: "37px",
                      width: "175px",
                      backgroundColor: "#FFA500",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#FFC300",
                      },
                    }}
                  >
                    <Typography
                      fontFamily="Poppins"
                      fontWeight={400}
                      fontSize={{
                        xs: "18px",
                        sm: "16px",
                        md: "18px",
                      }}
                      lineHeight={{
                        xs: "28px",
                        sm: "26px",
                        md: "28px",
                      }}
                    >
                      Add to Cart
                    </Typography>
                  </Button>
                </>
              )}
            </>
          )}
        </Stack>
      </Grid2>
    </React.Fragment>
  );
};

export default RestaurantMenuItems;
