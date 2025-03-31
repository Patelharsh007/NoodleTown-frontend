import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Container, Grid2, Skeleton, Typography } from "@mui/material";
import { fetchRestaurantDetailById } from "../../util/util";
import RestaurantMenuSkeleton from "../../skeleton/RestaurantMenuSkeleton";

interface restaurantProps {
  id: string;
}

const RestaurantMenu: React.FC<restaurantProps> = ({ id }) => {
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
    return (
      <Container maxWidth="md" sx={{ marginTop: { xs: "40px" } }}></Container>
    );
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ margin: "80px auto" }}>
        <Typography
          fontFamily={"Poppins"}
          fontWeight={500}
          fontSize={{ xs: "28px", sm: "24px" }}
          lineHeight={{ xs: "40px", sm: "36px" }}
          letterSpacing="0%"
          color={"#000000"}
          textAlign={{ xs: "center", sm: "left" }}
        >
          Menu
        </Typography>

        <Grid2
          container
          spacing={{ xs: "40px", sm: "30px" }}
          padding={{ xs: "10px", sm: "0" }}
        >
          {isLoading ? (
            // Show skeleton while loading
            <RestaurantMenuSkeleton />
          ) : (
            restaurant?.menuImages.map((image: string, id: number) => (
              <Grid2
                size={{ xs: 12, sm: 6, md: 4 }}
                marginTop={"30px"}
                key={id}
              >
                <Box
                  component={"img"}
                  src={image}
                  alt={restaurant?.title}
                  borderRadius={"20px"}
                  width={"100%"}
                  height={{ xs: "100%", sm: "500px" }}
                  sx={{
                    objectFit: "cover",
                    objectPosition: "center center",
                  }}
                />
                <Typography
                  margin={"16px"}
                  fontFamily={"Poppins"}
                  fontWeight={400}
                  fontSize={"16px"}
                  lineHeight={"24px"}
                  letterSpacing="0%"
                  color={"#000000"}
                  textAlign={"center"}
                >
                  Menu-{id + 1}
                </Typography>
              </Grid2>
            ))
          )}
        </Grid2>
      </Container>
    </>
  );
};

export default RestaurantMenu;
