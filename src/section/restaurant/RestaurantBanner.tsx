import React from "react";
import { Box, Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchRestaurantDetailById } from "../../util/util";
import RestaurantBannerSkeleton from "../../skeleton/RestaurantBannerSkeleton";
import { RestaurantItem } from "../../types/type";

interface restaurantProps {
  id: string;
}

const RestaurantBanner: React.FC<restaurantProps> = ({ id }) => {
  const {
    data: restaurant,
    isLoading,
    error,
  } = useQuery<RestaurantItem>({
    queryKey: ["restaurantDetails", id],
    queryFn: () => fetchRestaurantDetailById(id),
    staleTime: 10 * 60 * 1000, // 5min
  });

  if (error) {
    return <Container maxWidth="md" sx={{ marginTop: { xs: "40px" } }} />;
  }

  return (
    <>
      {isLoading ? (
        <RestaurantBannerSkeleton />
      ) : (
        <Box
          width={"100%"}
          margin={{ xs: "30px auto", sm: "50px auto" }}
          display={"grid"}
          gridTemplateAreas={{
            xs: '"first" "second" "third"',
            sm: '"first second" "first third"',
          }}
          gridTemplateColumns={{ xs: "1fr", sm: "1.1fr 0.9fr" }}
          gap={"10px"}
        >
          {restaurant && restaurant?.poster_images?.[0] && (
            <Box
              component={"img"}
              src={restaurant?.poster_images[0]}
              alt="Restaurant meals"
              width={"100%"}
              height={{ xs: "200px", sm: "500px", lg: "600px" }}
              gridArea={"first"}
              overflow={"hidden"}
              sx={{
                objectFit: "cover",
                objectPosition: "center center",
              }}
            />
          )}
          {restaurant?.poster_images?.[1] && (
            <Box
              component={"img"}
              src={restaurant?.poster_images[1]}
              alt="Restaurant meals"
              width={"100%"}
              height={{ xs: "200px", sm: "245px", lg: "295px" }}
              gridArea={"second"}
              overflow={"hidden"}
              sx={{
                objectFit: "cover",
                objectPosition: "center center",
              }}
            />
          )}
          {restaurant?.poster_images?.[2] && (
            <Box
              component={"img"}
              src={restaurant?.poster_images[2]}
              alt="Restaurant meals"
              width={"100%"}
              height={{ xs: "200px", sm: "245px", lg: "295px" }}
              gridArea={"third"}
              overflow={"hidden"}
              sx={{
                objectFit: "cover",
                objectPosition: "center center",
              }}
            />
          )}
        </Box>
      )}
    </>
  );
};

export default RestaurantBanner;
