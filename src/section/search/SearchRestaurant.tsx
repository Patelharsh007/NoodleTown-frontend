import { Box, Typography, Grid2, Stack, Chip, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { fetchSearchRestaurants } from "../../util/util";
import { RestaurantItem } from "../../types/type";

interface SearchRestaurantProp {
  city: string;
  value: string;
}

const SearchRestaurant: React.FC<SearchRestaurantProp> = ({ city, value }) => {
  const navigate = useNavigate();

  const {
    data: restaurants,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["SerachRestaurant", city, value],
    queryFn: () => fetchSearchRestaurants(city, value),
  });

  return (
    <Box marginY={"50px"}>
      <Typography variant="h5" gutterBottom>
        Restaurants
      </Typography>

      {isLoading ? (
        // Skeleton
        <Grid2 container spacing={3} marginTop={"20px"}>
          {[...Array(3)].map((_, index) => (
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
                <Skeleton
                  variant="rectangular"
                  width="90%"
                  height={170}
                  sx={{ marginX: "auto", marginTop: "20px", borderRadius: 2 }}
                />
                <Stack
                  marginY={"20px"}
                  spacing={"5px"}
                  width={"90%"}
                  marginX={"auto"}
                >
                  <Skeleton width="80%" height={30} sx={{ marginX: "auto" }} />
                  <Skeleton width="60%" height={20} sx={{ marginX: "auto" }} />
                </Stack>
                <Box
                  width={"90%"}
                  marginX={"auto"}
                  display={"flex"}
                  justifyContent={"center"}
                  flexWrap={"wrap"}
                  gap={1}
                  paddingBottom={2}
                >
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <Skeleton
                      key={idx}
                      variant="rectangular"
                      width={80}
                      height={30}
                      sx={{ borderRadius: 2 }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      ) : restaurants && restaurants.length > 0 ? (
        <Grid2 container spacing={3} marginTop={"20px"}>
          {restaurants.map((restaurant: RestaurantItem) => (
            <Grid2
              size={{ xs: 12, sm: 6, md: 4 }}
              key={restaurant.restaurantId}
            >
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
                    navigate(`/restaurant/${restaurant.restaurantId}`);
                  }}
                  src={`${restaurant.logo}`}
                  alt={`${restaurant.title}`}
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
  );
};

export default SearchRestaurant;
