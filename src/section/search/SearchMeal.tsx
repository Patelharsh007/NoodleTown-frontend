import {
  Box,
  Typography,
  Grid2,
  Stack,
  ButtonGroup,
  Button,
  Skeleton,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { fetchSearchMeals } from "../../util/util";
import { CartItem, MealItem } from "../../types/type";
import useCart from "../../hooks/useCartMeal";
import debounce from "lodash.debounce";

const SearchMeal: React.FC<{ city: string; value: string }> = ({
  city,
  value,
}) => {
  const {
    cart = [],
    isLoadingCart,
    errorCart,
    addToCart,
    incrementItem,
    decrementItem,
  } = useCart();

  const {
    data: meals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["SearchMeal", city, value],
    queryFn: () => fetchSearchMeals(city, value),
  });

  const isItemInCart = (mealId: string) =>
    cart.length > 0 && cart?.some((item: CartItem) => item.meal?.id === mealId);
  const getItemQuantity = (mealId: string) =>
    cart?.find((item: CartItem) => item.meal?.id === mealId)?.quantity || 0;

  const handleAddToCart = (meal: MealItem) => {
    if (!meal || isItemInCart(meal.id)) return;
    addToCart(meal.id);
  };

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

  const handleIncrementMeal = (mealId: string) => debouncedIncrement(mealId);
  const handleDecrementMeal = (mealId: string) => debouncedDecrement(mealId);

  return (
    <Box marginTop={"50px"}>
      <Typography variant="h5" gutterBottom>
        Meals
      </Typography>

      {isLoading ? (
        <Grid2 container spacing={3} marginBottom={"50px"} marginTop={"20px"}>
          {[...Array(3)].map((_, index) => (
            <Grid2
              size={{ xs: 12, sm: 6, md: 4 }}
              key={index}
              padding={"10px"}
              bgcolor={"#f3f3f3"}
              borderRadius={"17px"}
              width={"100%"}
              textAlign={"center"}
              marginX={"auto"}
            >
              <Skeleton
                variant="rectangular"
                animation="wave"
                width="98%"
                height={200}
                sx={{ borderRadius: "16px" }}
              />
              <Skeleton width="80%" animation="wave" height={30} />
              <Skeleton width="50%" animation="wave" height={30} />
            </Grid2>
          ))}
        </Grid2>
      ) : meals && meals.length > 0 ? (
        <Grid2 container spacing={3} marginBottom={"50px"} marginTop={"20px"}>
          {meals.map((meal: MealItem) => (
            <Grid2
              size={{ xs: 12, sm: 6, md: 4 }}
              key={meal.id}
              paddingY={"10px"}
              bgcolor={"#f3f3f3"}
              borderRadius={"17px"}
              width={"100%"}
              justifyContent={"flex-start"}
            >
              <Stack width={"100%"} paddingY={"10px"}>
                <Link
                  to={`/product/${meal.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    component={"img"}
                    src={meal.image}
                    alt={meal.title}
                    sx={{
                      display: "block",
                      width: "95%",
                      marginX: "auto",
                      height: { xs: "190px", sm: "270px" },
                      borderRadius: "16px",
                      objectFit: "cover",
                      objectPosition: "center center",
                    }}
                  />
                </Link>

                <Stack
                  spacing={{ xs: "2px", sm: "9px" }}
                  paddingTop={"15px"}
                  width={"90%"}
                  marginX={"auto"}
                >
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
                    {meal.short_description}
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

                  {isItemInCart(meal.id) ? (
                    <ButtonGroup
                      disableElevation
                      sx={{
                        height: "37px",
                        width: "175px",
                        "& .MuiButtonGroup-grouped:not(:last-of-type)": {
                          borderColor: "transparent",
                        },
                      }}
                    >
                      <Button
                        onClick={() => handleDecrementMeal(meal.id)}
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
                        <Typography
                          fontFamily="Poppins"
                          fontWeight={400}
                          fontSize={16}
                        >
                          {getItemQuantity(meal.id)}
                        </Typography>
                      </Button>
                      <Button
                        onClick={() => handleIncrementMeal(meal.id)}
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
                    <Button
                      onClick={() => handleAddToCart(meal)}
                      sx={{
                        height: "37px",
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
                        fontSize={16}
                      >
                        Add to Cart
                      </Typography>
                    </Button>
                  )}
                </Stack>
              </Stack>
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No meals found for your search.
        </Typography>
      )}
    </Box>
  );
};

export default SearchMeal;
