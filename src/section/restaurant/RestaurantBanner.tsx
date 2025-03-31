import React from "react";
import { Box, Container, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchRestaurantDetailById } from "../../util/util";

interface restaurantProps {
  id: string;
}

const RestaurantBanner: React.FC<restaurantProps> = ({ id }) => {
  //query to get restaurant data by id
  const {
    data: restaurant,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["restaurantDetails", id],
    queryFn: () => fetchRestaurantDetailById(id),
  });

  if (error) {
    return <Container maxWidth="md" sx={{ marginTop: { xs: "40px" } }} />;
  }

  return (
    <>
      {isLoading ? (
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
          {/* Skeleton loader for images */}
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            sx={{
              gridArea: "first",
              height: { xs: "200px", sm: "500px", lg: "600px" },
            }}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            sx={{
              gridArea: "second",
              height: { xs: "200px", sm: "245px", lg: "295px" },
            }}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            sx={{
              gridArea: "third",
              height: { xs: "200px", sm: "245px", lg: "295px" },
            }}
          />
        </Box>
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
          {/* Check for posterImages existence */}
          {restaurant?.posterImages?.[0] && (
            <Box
              component={"img"}
              src={restaurant?.posterImages[0]}
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
          {restaurant?.posterImages?.[1] && (
            <Box
              component={"img"}
              src={restaurant?.posterImages[1]}
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
          {restaurant?.posterImages?.[2] && (
            <Box
              component={"img"}
              src={restaurant?.posterImages[2]}
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
