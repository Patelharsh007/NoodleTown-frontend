import React from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, Container, Typography, Grid2, Stack, Chip } from "@mui/material";
import { MealItem, RestaurantItem } from "../types/type";
import restaurants from "../data/restaurantsData";
import mealItems from "../data/mealItem";

export const SearchPage: React.FC = () => {
  const { selectedCity, searchValue } = useParams<{
    selectedCity: string;
    searchValue: string;
  }>();

  const navigate = useNavigate();

  let matchedRestaurant: RestaurantItem[] = [];
  let matchedMealItems: MealItem[] = [];

  if (searchValue && selectedCity) {
    // Filter matched restaurants based on city and search query
    matchedRestaurant = restaurants.filter(
      (restaurant) =>
        restaurant.address.toLowerCase().includes(selectedCity.toLowerCase()) &&
        (restaurant.categories
          .join(" ")
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
          restaurant.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          restaurant.address.toLowerCase().includes(searchValue.toLowerCase()))
    );

    // Filter matched meal items based on city and search query
    matchedMealItems = mealItems.filter(
      (meal) =>
        restaurants
          .find((restaurant) => restaurant.id === meal.restaurantId)
          ?.address.toLowerCase()
          .includes(selectedCity.toLowerCase()) &&
        (meal.category.toLowerCase().includes(searchValue.toLowerCase()) ||
          meal.title.toLowerCase().includes(searchValue.toLowerCase()))
    );
  }

  return (
    <>
      <Navbar linkColor="#000000" />
      <Container sx={{ paddingTop: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Search Results:
          </Typography>
        </Box>

        {matchedRestaurant.length > 0 && (
          <Box marginY={"50px"}>
            {/* Display matched restaurants if any are found */}
            <Typography variant="h5" gutterBottom>
              Restaurants
            </Typography>

            {matchedRestaurant.length > 0 ? (
              <Grid2 container spacing={3} marginTop={"20px"}>
                {matchedRestaurant.map((restaurant, index) => (
                  <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      height={"auto"}
                      width={{ xs: "80%", sm: "100%" }}
                      marginX={"auto"}
                      bgcolor={"#f3f3f3"}
                      borderRadius={"17px"}
                    >
                      <Box
                        component={"img"}
                        onClick={() => {
                          navigate(`/restaurant/${restaurant.id}`);
                        }}
                        src={`${restaurant.logo}`}
                        alt={`$restaurant.id`}
                        height={{ xs: "120px", sm: "170px" }}
                        width={"90%"}
                        marginX={"auto"}
                        marginTop={"20px"}
                        borderRadius={"16px"}
                        sx={{
                          objectFit: "contain",
                          borderRadius: 2,
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                      />

                      <Stack
                        marginY={"20px"}
                        spacing={"5px"}
                        width={"90%"}
                        marginX={"auto"}
                      >
                        <Typography
                          textAlign={"center"}
                          fontWeight={500}
                          fontSize={"25px"}
                        >
                          {restaurant.title}
                        </Typography>
                        <Typography textAlign={"center"}>
                          {restaurant.address}
                        </Typography>
                      </Stack>
                      {/* Display Cuisines as Chips in a Row */}
                      <Box
                        width={"90%"}
                        marginX={"auto"}
                        display={"flex"}
                        justifyContent={"center"}
                        flexWrap={"wrap"}
                        gap={1}
                        paddingBottom={2}
                      >
                        {restaurant.cuisines.map((cuisine, idx) => (
                          <Chip
                            key={idx}
                            label={cuisine}
                            sx={{
                              backgroundColor: "grey",
                              color: "#fff",
                              borderRadius: 2,
                              fontWeight: 500,
                              "&:hover": {
                                backgroundColor: "#d3d3d3",
                                color: "#000000",
                              },
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Grid2>
                ))}
              </Grid2>
            ) : (
              <Typography variant="body1" color="textSecondary">
                No restaurants found for your search.
              </Typography>
            )}
          </Box>
        )}

        {matchedMealItems.length > 0 && (
          <Box marginTop={"50px"}>
            <Typography variant="h5" gutterBottom>
              Meals
            </Typography>

            {matchedMealItems.length > 0 ? (
              <Grid2
                container
                spacing={3}
                marginBottom={"50px"}
                marginTop={"20px"}
              >
                {matchedMealItems.map((meal, index) => (
                  <Grid2
                    size={{ xs: 12, sm: 6, md: 4 }}
                    key={meal.id}
                    paddingY={"10px"}
                    bgcolor={"#f3f3f3"}
                    borderRadius={"17px"}
                    width={"100%"}
                    justifyContent={"flex-start"}
                  >
                    <Stack width={"100%"}>
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
        )}
      </Container>
    </>
  );
};
